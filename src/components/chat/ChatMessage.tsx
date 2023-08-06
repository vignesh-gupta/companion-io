"use client"

import React from 'react'
import { useToast } from '../ui/use-toast';
import { useTheme } from 'next-themes';

type ChatMessageProps = {
  role: "user" | "system";
  content: string;
  isLoading: boolean;
  src? : string;
}

const ChatMessage = ({role , content , isLoading , src} : ChatMessageProps) => {

  const { toast } = useToast();
  const { theme } = useTheme();

  return (
    <div>ChatMessage</div>
  )
}

export default ChatMessage