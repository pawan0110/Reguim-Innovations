// import { useState, useEffect } from "react";
// import Cropper from "react-easy-crop";
// import { FaCamera } from "react-icons/fa";
// import { getCroppedImg } from "../utils/cropImage";
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const [image, setImage] = useState(null);
//   const [tempImage, setTempImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [openCrop, setOpenCrop] = useState(false);
//   const { userData } = useSelector((state) => state.user);

//   /* Drag state */
//   const [dragActive, setDragActive] = useState(false);
//   const [dragCount, setDragCount] = useState(0);

//   /* ---------------- GLOBAL DROP PREVENTION ---------------- */
//   useEffect(() => {
//     const prevent = (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//     };

//     window.addEventListener("dragover", prevent);
//     window.addEventListener("drop", prevent);

//     return () => {
//       window.removeEventListener("dragover", prevent);
//       window.removeEventListener("drop", prevent);
//     };
//   }, []);

//   /* ---------------- FILE HANDLING ---------------- */

//   const handleFile = (file) => {
//     if (!file || !file.type.startsWith("image/")) return;

//     const url = URL.createObjectURL(file);
//     setTempImage(url);
//     setOpenCrop(true);
//   };

//   const handleImageSelect = (e) => {
//     handleFile(e.target.files[0]);
//   };

//   const onCropComplete = (_, croppedPixels) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   const handleCropSave = async () => {
//     const croppedImg = await getCroppedImg(tempImage, croppedAreaPixels);
//     setImage(croppedImg);
//     if (tempImage) URL.revokeObjectURL(tempImage);
//     setOpenCrop(false);
//   };

//   /* ---------------- DRAG & DROP ----------- */

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragCount((c) => c + 1);
//     setDragActive(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragCount((c) => {
//       if (c === 1) setDragActive(false);
//       return c - 1;
//     });
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setDragActive(false);
//     setDragCount(0);

//     const file = e.dataTransfer.files?.[0];
//     handleFile(file);
//   };

//   return (
//     <div className="w-180 h-110 mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
//       {/* Image Section */}
//       <div className="flex justify-center">
//         <div
//           className={`relative group border-2 border-dashed rounded-xl transition
//             ${dragActive ? "border-black bg-black/10" : "border-transparent"}`}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <img
//             src={image || userData.profilePic || "/avatar.png"}
//             alt="Profile"
//             draggable={false}
//             className="w-50 h-50 object-cover rounded-xl pointer-events-none"
//           />

//           {/* Drag Overlay */}
//           {dragActive && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm rounded-xl pointer-events-none">
//               Drop image to upload
//             </div>
//           )}

//           {/* Camera Upload */}
//           <label className="absolute bottom-3 right-3 bg-black/50 text-white p-3 rounded-full cursor-pointer hover:bg-slate-400/50">
//             <FaCamera />
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageSelect}
//             />
//           </label>
//         </div>
//       </div>

//       {/* Content */}
//       <div>
//         <h2 className="text-3xl font-semibold">
//           {userData?.name || "User"}
//         </h2>
//          <hr className="border-gray-200 mt-2 w-70" />
//         <p className="mt-1 text-gray-700 text-sm">
//           {userData?.email || ""}
//         </p>
//       </div>

//       {/* Crop Modal */}
//       {openCrop && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-white w-[90%] max-w-md p-4 rounded-lg">
//             <div className="relative w-full h-64 bg-black ">
//               <Cropper
//                 image={tempImage}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//             </div>

//             <div className="mt-4">
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.01}
//                 value={zoom}
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 onClick={() => {
//                   URL.revokeObjectURL(tempImage);
//                   setOpenCrop(false);
//                 }}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCropSave}
//                 disabled={!croppedAreaPixels}
//                 className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <hr className="border-gray-200 mt-16 col-span-full" />
//     </div>
//   );
// };

// // export default Profile;

// import { useSelector } from "react-redux";
// import React, { useState } from "react";
// import api from "../utils/api.js";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice.js";
// import { toast } from "react-toastify";
// import { clipLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   let { userData } = useSelector((state) => state.user);
//   let [name, setName] = useState(userData.name || "");
//   let [email, setEmail] = useState(userData.email || "");
//   let [photoUrl, setPhotoUrl] = useState(null);
//   let dispatch = useDispatch();
//   let [loading, setLoading] = useState(false);
//   let navigate = useNavigate();

//   const updateProfile = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     if (photoUrl) formData.append("photoUrl", photoUrl);
//     setLoading(true);
//     try {
//       const result = await api.post("/api/user/updateProfile", formData);
//       dispatch(setUserData(result.data));
//       setLoading(false);
//       toast.success("profile updated Successfully")
//     } catch (error) {
//       toast.error("update failed");
//     } finally {
//       setLoading(false)
//     }
//   };

//    return (
//     <div className="w-180 h-110 mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
// //       {/* Image Section */}
// //       <div className="flex justify-center">
// //         <div
// //           className={`relative group border-2 border-dashed rounded-xl transition
// //             ${dragActive ? "border-black bg-black/10" : "border-transparent"}`}
// //           onDragEnter={handleDragEnter}
// //           onDragLeave={handleDragLeave}
// //           onDragOver={handleDragOver}
// //           onDrop={handleDrop}
// //         >
// //           <img
// //             src={image || userData.profilePic || "/avatar.png"}
// //             alt="Profile"
// //             draggable={false}
// //             className="w-50 h-50 object-cover rounded-xl pointer-events-none"
// //           />

// //           {/* Drag Overlay */}
// //           {dragActive && (
// //             <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm rounded-xl pointer-events-none">
// //               Drop image to upload
// //             </div>
// //           )}

// //           {/* Camera Upload */}
// //           <label className="absolute bottom-3 right-3 bg-black/50 text-white p-3 rounded-full cursor-pointer hover:bg-slate-400/50">
// //             <FaCamera />
// //             <input
// //               type="file"
// //               accept="image/*"
// //               className="hidden"
// //               onChange={handleImageSelect}
// //             />
// //           </label>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div>
// //         <h2 className="text-3xl font-semibold">
// //           {userData?.name || "User"}
// //         </h2>
// //          <hr className="border-gray-200 mt-2 w-70" />
// //         <p className="mt-1 text-gray-700 text-sm">
// //           {userData?.email || ""}
// //         </p>
// //       </div>

// //       {/* Crop Modal */}
// //       {openCrop && (
// //         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
// //           <div className="bg-white w-[90%] max-w-md p-4 rounded-lg">
// //             <div className="relative w-full h-64 bg-black ">
// //               <Cropper
// //                 image={tempImage}
// //                 crop={crop}
// //                 zoom={zoom}
// //                 aspect={1}
// //                 onCropChange={setCrop}
// //                 onZoomChange={setZoom}
// //                 onCropComplete={onCropComplete}
// //               />
// //             </div>

// //             <div className="mt-4">
// //               <input
// //                 type="range"
// //                 min={1}
// //                 max={3}
// //                 step={0.01}
// //                 value={zoom}
// //                 onChange={(e) => setZoom(Number(e.target.value))}
// //                 className="w-full"
// //               />
// //             </div>

// //             <div className="flex justify-end gap-3 mt-4">
// //               <button
// //                 onClick={() => {
// //                   URL.revokeObjectURL(tempImage);
// //                   setOpenCrop(false);
// //                 }}
// //                 className="px-4 py-2 border rounded"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleCropSave}
// //                 disabled={!croppedAreaPixels}
// //                 className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
// //               >
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       <hr className="border-gray-200 mt-16 col-span-full" />
// //     </div>
// //   );
// }
// }

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";

import api from "../utils/api.js";
import { setUserData } from "../redux/userSlice.js";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(userData?.profilePic || "/avatar.png");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photoFile) formData.append("photo", photoFile);

    try {
      setLoading(true);
      const res = await api.post("/api/user/updateProfile", formData);
      dispatch(setUserData(res.data));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
      {/* Image Section */}
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={preview}
            alt="Profile"
            className="w-48 h-48 object-cover rounded-xl"
          />

          <label className="absolute bottom-3 right-3 bg-black/70 text-white p-3 rounded-full cursor-pointer hover:bg-black">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6">Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={updateProfile}
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
