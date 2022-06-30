import { handleMessageMedia, handleMessagePost } from "./messageHandlers.js";

export const onMessageReceive = async ({ client, message, chat }) => {
  const postId = await handleMessagePost({
    message: message,
    chat: chat,
  });
  console.log(postId);
  await handleMessageMedia({
    client: client,
    message: message,
    postId: postId,
  });
};
