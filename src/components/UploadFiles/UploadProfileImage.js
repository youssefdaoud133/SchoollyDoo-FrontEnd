import { Box, Modal, Slider, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import "react-image-crop/dist/ReactCrop.css";
import { LazyLoadImage, afterLoad } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Import the CSS for the blur effect

import axios from "axios";

import { FaGithub } from "react-icons/fa"; // Use any suitable Tailwind CSS icon
///
import CrudApi from "../../utils/CrudClass";
const Crud = new CrudApi(
  "http://localhost:8000/api/v1",
  "/users/uploadprofilepicture"
);

///

const storedUser = JSON.parse(window.localStorage.getItem("User"));
let blobv2;

// import "react-avatar-editor/umd/avatar-editor.css"; // Import AvatarEditor CSS

// Modal
const CropperModal = ({
  src,
  modalOpen,
  setModalOpen,
  setPreview,
  preview,
  setcropRef,
}) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  // handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      blobv2 = blob;
      console.log(result);
      setPreview(URL.createObjectURL(blob));
      setModalOpen(false);
    }
  };

  return (
    <Modal open={modalOpen}>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
        <Box className="w-full sm:w-96 h-auto sm:h-96 bg-white rounded-lg shadow-lg p-6">
          <AvatarEditor
            ref={cropRef}
            image={src}
            className="w-full h-60 sm:h-80 mb-4"
            border={50}
            borderRadius={150}
            color={[0, 0, 0, 0.72]}
            scale={slideValue / 10}
            rotate={0}
          />

          <Slider
            min={10}
            max={50}
            className="w-full mt-4"
            value={slideValue}
            onChange={(e) => setSlideValue(e.target.value)}
          />

          <div className="flex justify-end mt-4">
            <Button
              className="text-gray-600 mr-2 border border-gray-600 hover:bg-gray-100"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </Box>
      </div>
    </Modal>
  );
};

// Container
const UploadProfileImage = ({ dp }) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const inputRef = useRef(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };
  const handleSaveImage = async (e) => {
    e.preventDefault();
    setloading(1);

    if (preview) {
      try {
        const formData = new FormData();
        formData.append("image", blobv2);

        const addProfilePicture = await Crud.createProfilePicture(
          formData,
          storedUser.data.token
        );
        setloading(0);
        console.log(addProfilePicture);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    ); // Display a loading indicator
  }

  return (
    <>
      <main className="container mx-auto flex flex-col-reverse sm:flex-row items-center justify-center">
        <div className="w-full sm:w-1/2">
          <div className="mt-4">
            <LazyLoadImage
              src={preview || dp}
              alt=""
              // afterLoad={() => {
              //   setloading(0);
              // }}
              className="w-48 h-48 mx-auto object-cover rounded-full"
              effect="blur"
              loading="lazy"
              // onLoad={() => {
              //   setloading(false);
              // }}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <CropperModal
            modalOpen={modalOpen}
            src={src}
            setPreview={setPreview}
            setModalOpen={setModalOpen}
            preview={preview}
          />
          <div className="mt-4 text-center">
            <a href="/" onClick={handleInputClick} className="block">
              <FcAddImage className="w-12 h-12 text-blue-500 mx-auto" />
            </a>
            <small className="block mt-2">Click to select an image</small>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImgChange}
              className="hidden"
            />
            {preview && (
              <button
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                onClick={handleSaveImage}
              >
                Save Image
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default UploadProfileImage;
