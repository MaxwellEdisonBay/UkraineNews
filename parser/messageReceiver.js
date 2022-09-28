import { handleMessageMedia, handleMessagePost } from "./messageHandlers.js";
import { deleteOldMedia } from "./firebaseHelper.js";

export const onMessageReceive = async ({ client, message, chat }) => {
  console.log("=====")
  console.log(`New post received from ${chat.username} at ${new Date()}`)
  if (message.message !== null) {
    console.log(message.message.slice(0, 100)+"...")
  }
  console.log("=====")

  const postId = await handleMessagePost({
    message: message,
    chat: chat,
  });
  // console.log(postId);
  await handleMessageMedia({
    client: client,
    message: message,
    postId: postId,
  });

  // await deleteOldMedia()
};
