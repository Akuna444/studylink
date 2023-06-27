import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import "./chatlayout.css";

const apiKey = "ntrxeup6wsy9";
const user = {
  id: "john",
  name: "John",
  image: "https://getstream.io/random_png/?id=lucky-morning-3&name=lucky",
};

// const chatClient = new StreamChat("nv3d5f4b6a6d");
// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibHVja3ktbW9ybmluZy0zIiwiZXhwIjoxNjg3ODY0OTk0fQ.-ZK8j82R0wEGbLIYXUduTvwexEcacsXn6TzCrEGFzhs";

//   const user
// // chatClient.connectUser(
// //   {
// //     id: "lucky-morning-3",
// //     name: "lucky",
// //     image: "https://getstream.io/random_png/?id=lucky-morning-3&name=lucky",
// //   },
// //   userToken
// // );

// // const channel = chatClient.channel("messaging", "custom_channel_id", {
// //   // add as many custom fields as you'd like
// //   image: "https://www.drupal.org/files/project-images/react.png",
// //   name: "Talk about React",
// //   members: ["lucky-morning-3"],
// // });

const App = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(user.id));
      const channel = chatClient.channel("messaging", "react-talk", {
        image: "https://getstream.io/random_png/?id=lucky-morning-3&name=lucky",
        name: "Student chat",
        memebers: [user.id],
      });
      await channel.watch();
      setChannel(channel);
      setClient(chatClient);
    }
    init();
    if (client) return () => client.didconnectUser();
  }, []);

  if (!channel || !client) return;

  return (
    <Chat client={client} theme="str-chat__theme-light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
