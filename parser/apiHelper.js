import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";
import FormData from "form-data"
dotenv.config();

axios.defaults.headers.post["Authorization"] = process.env.API_HEADER_SECRET;

const apiUrl = process.env.API_BASE_URL;
const apiSecret = process.env.API_HEADER_SECRET;

const deeplAuthKey = process.env.DEEPL_AUTH_KEY
const imgBBApiKey = process.env.IMGBB_API_KEY

// {groupedId, url, type}
export const apiAddFile = async (addFileData) => {
  try {
    await axios.post(`${apiUrl}/posts/bot/?action=addFile`, addFileData);
    // .then((response) => console.log(response.status));
  } catch (err) {
    console.log(err);
  }
};

// {text, source, sourceName, sourceUrl }
export const apiAddPost = async (addPostData) => {
  try {
    const res = await axios.post(
      `${apiUrl}/posts/bot/?action=addPost`,
      addPostData
    );
    return res.data.id;
  } catch (err) {
    console.log(err);
    return null;
  }
  // .then((response) => console.log(response.status));
};

export const apiTranslateText = async (text) => {
  try {
    const res = await axios({
      method: "post",
      url: `https://api.deepl.com/v2/translate?auth_key=${deeplAuthKey}`,
      data: qs.stringify({
        auth_key: deeplAuthKey,
        text: text.replace(/\n/g, "<br> </br>"),

        target_lang: "CS",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    // console.log(res.data);
    // console.log(res.data.translations[0]);
    return res.data.translations[0].text;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const apiGetMediaToDelete = async ({ days }) => {
  try {
    const res = await axios.post(
      `${apiUrl}/posts/bot/?action=getMediaToDelete`,
      { days: days }
    );
    console.log(`${res.data.length} old media links fetched.`)
    const links = []
    if (res.data != null) {
      res.data.forEach((doc) => {
        const media = doc.media
        if (media != null) {
          media.forEach((obj) => {
            links.push(obj.url)
          })
        }
      })
    }

    return links
  } catch (err) {
    // console.log(err)
    return null
  }
}

export const apiUploadImage = async (fileBuffer,
  filename,
  fileType,
  postId,
  groupedId) => {
  try {
    // var formData = new FormData();
    // formData.append("image", fileBuffer);
    // const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    const formData = new FormData()
    // formData.append('key', imgBBApiKey)
    const baseImage = Buffer.from(fileBuffer).toString('base64')
    formData.append('image', baseImage)
    
    // console.log(typeof fileBuffer)
    const res = await axios({
      method: 'post',
      url: `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
      data: formData,
      contentType: false,
      mimeType: "multipart/form-data",
      processData: false, 
    })
    const url = res.data.data.url
    console.log(url)
    // console.log(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`)
    // const downloadURL = "testUrl"

    const addFileData = {
      url: url,
      type: fileType,
      postId: postId,
      telegramGroupedId: groupedId,
    };
    await apiAddFile(addFileData);
  } catch (error) {
    console.log(error)
  }
}
