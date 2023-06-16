import React, { useState, useRef, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const CampusCoordinatorChat = () => {
  return (
    <main
      style={{
        position: "relative",
        height: "82vh",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar name="Lilly" status="available" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        {/* Chat */}
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
                direction: "incoming",
                position: "first",
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </main>
  );
};

export default CampusCoordinatorChat;
