"use client";

import { Companion } from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

type ChatMessagesProps = {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
};

const ChatMessages = ({
  messages,
  isLoading,
  companion,
}: ChatMessagesProps) => {

  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const fakeLoadingTimer = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fakeLoadingTimer);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  } , [messages.length])

  return (
    <div className="flex-1 pr-4 overflow-y-auto">
      <ChatMessage
        role="system"
        src={companion.src}
        content={`Hello, I'm ${companion.name}, ${companion.description} `}
        isLoading={fakeLoading}
      />

      {messages.map((message, index) => (
        <ChatMessage 
          key={message.content}
          {...message}
          src={companion.src}
        />
      ))}

      {isLoading && (
        <ChatMessage 
          role="system"
          src={companion.src}
          isLoading
        />
      )}

      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
