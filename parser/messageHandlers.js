import crypto from "crypto";
import * as mime from "mime-types";
import { uploadFileAsPromise } from "./firebaseHelper.js";
import { Api } from "telegram";
import { apiAddPost, apiTranslateText } from "./apiHelper.js";

export const handleMessagePost = async ({ message, chat }) => {
  const text = message.message;
  const translatedText = await apiTranslateText(text);
  const addPostData = {
    text: translatedText,
    source: "telegram",
    sourcePostUrl: `https://t.me/${chat.username}/${message.id}`,
    sourceId: `${chat.id}`,
    telegramGroupedId: message.groupedId ? message.groupedId + "" : null,
    reviewedAt: new Date(message.date * 1000),
    acceptedBy: "TelegramBot",
  };
  const res = await apiAddPost(addPostData);
  return res;
};

export const handleMessageMedia = async ({ client, message, postId }) => {
  if (message.media) {
    const groupedId = message.groupedId ? message.groupedId + "" : null;
    const limit = 1048576;
    if (message.media.photo) {
      console.log(message.media.photo.sizes);
      const fileName = `telegram-${crypto.randomUUID()}.jpeg`;
      const result = await client.invoke(
        new Api.upload.GetFile({
          location: new Api.InputPhotoFileLocation({
            id: message.media.photo.id,
            accessHash: message.media.photo.accessHash,
            fileReference: message.media.photo.fileReference,
            // thumbSize: message.media.photo.sizes.find(
            //   (size) => size.className === "PhotoSizeProgressive"
            // ).type,
            thumbSize:
              message.media.photo.sizes[message.media.photo.sizes.length - 1]
                .type,
          }),
          offset: 0,
          limit: limit,
          // precise: true,
          // cdnSupported: true,
        })
      );
      // console.log(result); // prints the result
      await uploadFileAsPromise(
        result.bytes,
        fileName,
        "image",
        postId,
        groupedId
      );
      // fs.writeFileSync(fileName, result.bytes);
      // console.log("File " + fileName + " has been saved");
    } else if (message.media.document) {
      const size = message.media.document.size;
      let sizeWritten = 0;
      const fileName = `${"telegram-" + crypto.randomUUID()}.${mime.extension(
        message.media.document.mimeType
      )}`;
      let fileBuffer = new Buffer.from("");
      while (sizeWritten < size) {
        const result = await client.invoke(
          new Api.upload.GetFile({
            location: new Api.InputDocumentFileLocation({
              id: message.media.document.id,
              accessHash: message.media.document.accessHash,
              fileReference: message.media.document.fileReference,
              thumbSize: "y",
            }),
            offset: sizeWritten,
            limit: limit,
            // precise: true,
            // cdnSupported: true,
          })
        );
        // console.log(result); // prints the result
        fileBuffer = Buffer.concat([fileBuffer, result.bytes]);
        // fs.writeFileSync(
        //   `${fileName}.${mime.extension(
        //     message.media.document.mimeType
        //   )}`,
        //   result.bytes,
        //   { flag: "a" }
        // );
        sizeWritten = sizeWritten + Buffer.byteLength(result.bytes);
        console.log("File " + fileName + " bytes written: " + sizeWritten);
      }
      await uploadFileAsPromise(
        fileBuffer,
        fileName,
        "video",
        postId,
        groupedId
      );
      console.log("File " + fileName + " has been saved");
    }
  }
};
