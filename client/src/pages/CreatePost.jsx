import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const [imageUploadingError, setImageUploadingError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const imageRef = useRef();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        // setImageUploadingError("Please select an image");
        toast.error("Please select an image.");
      }
      setImageUploadingError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          // setImageUploadingError("Image upload failed");
          toast.error("Image upload failed");

          setImageUploadingProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadingProgress(null);
            setImageUploadingError(null);
            setFormData({ ...formData, image: downloadURL });
            toast.success("Image uploaded.");
          });
        }
      );
    } catch (error) {
      setImageUploadingError("Image upload failed");
      // toast.error(imageUploadingError);
      setImageUploadingProgress(null);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">Reactjs</option>
            <option value="nextjs">Nextjs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 ">
          <FileInput
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            ref={imageRef}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadingProgress}
          >
            {imageUploadingProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadingProgress}
                  text={`${imageUploadingProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {/* {imageUploadingError && (
          <Alert color="failure">{imageUploadingError}</Alert>
        )} */}
        {formData.image && (
          <img
            src={formData.image}
            className="w-full h-72 object-cover"
            alt="image upload"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" size="sm" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
