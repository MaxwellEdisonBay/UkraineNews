import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { apiAddFile } from "./apiHelper.js";
import storage from "./firebaseConfig.js";

export const uploadFileAsPromise = (
  fileBuffer,
  filename,
  fileType,
  postId,
  groupedId
) => {
  const storageRef = ref(storage, `/telegram/${filename}`);

  const uploadTask = uploadBytesResumable(storageRef, fileBuffer);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        const addFileData = {
          url: downloadURL,
          type: fileType,
          postId: postId,
          telegramGroupedId: groupedId,
        };
        apiAddFile(addFileData);
        // GET URL
      });
    }
  );
  return uploadTask;
};
