import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full border-8 object-cover border-[lightgray]"
          />
        </div>
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
