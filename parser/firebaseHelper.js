import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { apiAddFile, apiGetMediaToDelete } from "./apiHelper.js";
import storage from "./firebaseConfig.js";


export const uploadFileAsPromise = (
  fileBuffer,
  filename,
  fileType,
  postId,
  groupedId
) => {
  const storageRef = ref(storage, `/telegram/${filename}`);
  var metadata = {
    cacheControl: 'public,max-age=4000',
  }
  const uploadTask = uploadBytesResumable(storageRef, fileBuffer, metadata);

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

export const deleteOldMedia = async () => {
  const links = await apiGetMediaToDelete({days: 24})
  const storage = getStorage();
  console.log("Deleting old media")
  // links.forEach((url, index) => {
    const url = links[0]
    const fileRef = ref(storage, url)
    
    deleteObject(fileRef).then(() => {
      // File deleted successfully
      console.log(`Deleted ${index} element`)
      
    }).catch((error) => {
      // console.log(`Error on ${index}`)
      console.log(error)
    });
  // })
  console.log("Delete finished")
  
}
