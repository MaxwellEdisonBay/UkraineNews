import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";
dotenv.config();

axios.defaults.headers.post["Authorization"] = process.env.API_HEADER_SECRET;

const apiUrl = process.env.API_BASE_URL;
const apiSecret = process.env.API_HEADER_SECRET;

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
      url: "https://api-free.deepl.com/v2/translate?auth_key=12b70fb8-eff7-79c3-07e6-7e123ab0999c:fx",
      data: qs.stringify({
        auth_key: "12b70fb8-eff7-79c3-07e6-7e123ab0999c:fx",
        text: text,
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
