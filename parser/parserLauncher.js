import dotenv from "dotenv";
dotenv.config();
const apiId = parseInt(process.env.TELEGRAM_APP_API_ID);
const apiHash = process.env.TELEGRAM_APP_API_HASH;
const sessionSave = process.env.TELEGRAM_STRING_SESSION;
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/StringSession.js";
import input from "input";
import { NewMessage } from "telegram/events/NewMessage.js";
const stringSession = new StringSession(sessionSave); // fill this later with the value from session.save()

import { onMessageReceive } from "./messageReceiver.js";
import { deleteOldMedia } from "./firebaseHelper.js";

const ALLOWED_CHANNELS = ["u_now", "valkaua", "uniannet", "truexanewsua"];
// const ALLOWED_CHANNELS = ["valkaua"];

// 1718881294 - valkaua
// 1197363285 - u_now
// 1105313000 - uniannet
// 1199360700 - truexanewsua

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
//  console.log(client.session.save()); // Save this string to avoid logging in again

  const chatsResponse = await client.invoke(
    new Api.messages.GetAllChats({
      exceptIds: [],
    })
  );
  const chats = chatsResponse.chats;
  // chats.forEach((ch) => {
  //   if (ch.title === "Труха⚡️Украина"){
  //     console.log(ch)

  //   }

  // })

  async function eventPrint(event) {
    const message = event.message;

    if (!event.isPrivate) {
      // await deleteOldMedia()
      const channel = message.peerId.channelId;
      const chat = chats.find((chat) => chat.id + "" === channel + "");
      if (chat && ALLOWED_CHANNELS.includes(chat.username)) {
        await onMessageReceive({
          client: client,
          message: message,
          chat: chat,
        });
      }
    }
  }

  client.addEventHandler(eventPrint, new NewMessage({}));
})();
