import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./Write.css";
import { Container } from "../../components/dnd/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Editor } from "@tinymce/tinymce-react";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { API_URL } from "../../App";
import storage from "../../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Oval } from "react-loader-spinner";
import DOMPurify from "dompurify";

export default function Write() {
  const { user, dispatch, isFetching } = useContext(Context);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const allowedFileTypes = ["jpg", "png", "mp4", "MOV", "jpeg"];
  const videoFileTypes = ["mp4", "MOV"];

  const addFiles = (addFiles) => {
    const tempFile = [...files];
    let id = files.length;
    for (let fIndex = 0; fIndex < addFiles.length; fIndex++) {
      const fileExtension = addFiles[fIndex].name.split(".").at(-1);
      if (!allowedFileTypes.includes(fileExtension)) {
        window.alert(
          `File does not support. Files type must be ${allowedFileTypes.join(
            ", "
          )}`
        );
        return false;
      } else {
        tempFile.push({
          id: id,
          text: addFiles[fIndex].name,
          file: addFiles[fIndex],
        });
        id++;
      }
    }
    setFiles(tempFile);
  };

  const handleFirebaseUpload = async (e) => {
    e.preventDefault();
    dispatch({ type: "FETCHING_START" });
    const newPost = {
      username: user.firstName + " " + user.lastName,
      title: title,
      text: DOMPurify.sanitize(text),
      userID: user._id,
    };
    const filenames = [];
    let counter = 0;
    const sendPost = async () => {
      newPost.media = filenames;
      console.log(filenames);
      try {
        const res = await axios.post(`${API_URL}/api/posts`, newPost, {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        });
        console.log(res);
        window.location.replace("/");
        // window.location.replace("/post/" + res.data._id);
      } catch (error) {
        console.log(error);
        // TODO: Add error UI handling
      }
      dispatch({ type: "FETCHING_FINISH" });
    };

    if (files.length !== 0) {
      const uploadImageAsPromise = (file) => {
        const uuid = crypto.randomUUID();
        const ext = file.file.name.split(".").at(-1);
        const fileType = videoFileTypes.includes(ext) ? "video" : "image";
        const filename = uuid + "." + ext;
        const storageRef = ref(storage, `/files/${filename}`);
        // await storageRef.put(files[i].file).then((snapshot) =>
        //   getDownloadURL(snapshot.ref).then((url) => {
        //     console.log(url);
        //   })
        // );

        const uploadTask = uploadBytesResumable(storageRef, file.file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

              filenames.push({ url: downloadURL, type: fileType });
              counter++;
              if (counter === files.length) {
                console.log("SDSD");
                sendPost();
              }
            });
          }
        );
        return uploadTask;
      };

      Promise.all(
        // Array of "Promises"
        files.map(async (file) => {
          await uploadImageAsPromise(file);
        })
      )
        .then((url) => {
          console.log(`All success`);
          console.log(filenames);
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message);
        });
    } else {
      sendPost();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.name,
      title: title,
      text: text,
      userID: user._id,
    };
    const filenames = [];
    if (files.length !== 0) {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        let filename = Date.now() + files[i].file.name;
        filename = filename.replace(/\s/g, "");
        // data.append("name", filename);
        data.append(filename, files[i].file);
        filenames.push(filename);
      }
      try {
        console.log("Started uploading");
        await axios.post(`${API_URL}/api/upload`, data);
      } catch (error) {
        console.log(error);
        // TODO: Add error UI handling
      }
    }
    newPost.media = filenames;
    console.log(filenames);
    try {
      const res = await axios.post(`${API_URL}/api/posts`, newPost);
      console.log(res);
      // window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
      // TODO: Add error UI handling
    }
  };

  return (
    <div className="write">
      <div className="writeModule" hidden={!user}>
        {files.length !== 0 && (
          <img
            src={URL.createObjectURL(files[0].file)}
            alt=""
            className="write-image"
          />
        )}
        <div className="write-uploads">
          <DndProvider backend={HTML5Backend} disabled={isFetching}>
            <Container files={files} setFiles={setFiles} />
          </DndProvider>
        </div>
        <div className="write-form">
          <div className="write-form-group">
            <label htmlFor="file-input">
              <i className="write-icon fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => addFiles(e.target.files)}
              disabled={isFetching}
              multiple
            />
            <input
              type="text"
              placeholder="Title"
              className="write-input"
              autoFocus={true}
              disabled={isFetching}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* <button
            className="write-submit"
            type="button"
            onClick={handleFirebaseUpload}
          >
            Publish
          </button> */}
          {isFetching ? (
            <div className="compose-floating-button">
              <Oval color="teal" height={60} width={60} />
            </div>
          ) : (
            <div
              className="compose-floating-button"
              hidden={text === "" || title === ""}
              onClick={handleFirebaseUpload}
            >
              <Fab color="primary" aria-label="add">
                <EditIcon />
              </Fab>
            </div>
          )}
          <div className="write-form-group">
            {/* <TextareaAutosize
              placeholder="Tell your story..."
              type="text"
              className="write-input write-text"
              onChange={(e) => setText(e.target.value)}
            /> */}
            <Editor
              apiKey={process.env.REACT_APP_TINY_KEY}
              className="write-input write-text"
              placeholder="Tell your story..."
              initialValue="<p></p>"
              disabled={isFetching}
              onEditorChange={(content) => {
                setText(content);
              }}
              init={{
                height: "60vw",
                width: "80vw",
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:'Roboto', sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
