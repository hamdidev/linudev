import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const [imageUploadingError, setImageUploadingError] = useState(null);

  const imageRef = useRef();
  const handleImageChaneg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadingError(
          "Couldn't upload image (File must be less than 2MB)"
        );
        setImageUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChaneg}
          ref={imageRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer rounded-full"
          onClick={() => imageRef.current.click()}
        >
          {imageUploadingProgress && (
            <CircularProgressbar
              value={imageUploadingProgress || 0}
              text={`${imageUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageUploadingProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full border-8 object-cover border-[lightgray]${
              imageUploadingProgress &&
              imageUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageUploadingError && (
          <Alert color="failure">{imageUploadingError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.name}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button type="submit" outline gradientDuoTone="purpleToBlue">
          Update
        </Button>
      </form>
      <div className="flex text-red-500 justify-between mt-5">
        <span className="cursor-pointer ">Delete account</span>
        <span className="cursor-pointer ">Sign out</span>
      </div>
    </div>
  );
};

export default DashProfile;