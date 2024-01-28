import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const emailExists = await User.findOne({ email });
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(new ErrorHandler("All feilds are required", 400));
    }
    if (emailExists) {
      return next(new ErrorHandler("Email already exists", 400));
    }
    if (username > 3) {
      return next(
        new ErrorHandler(
          "Username is too short, it must be 3 chars at least",
          403
        )
      );
    }
    const newUser = User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    next(new ErrorHandler(error));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(new ErrorHandler(404, "User not found."));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      next(new ErrorHandler(401, "Wrong credentials."));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "50m",
    });
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(new ErrorHandler(error));
  }
};
