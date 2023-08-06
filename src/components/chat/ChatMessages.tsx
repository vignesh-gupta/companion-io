"use client"

import { Companion } from '@prisma/client';
import React from 'react'

type ChatMessagesProps = {
  messages: any[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({ messages , isLoading , companion } : ChatMessagesProps) => {
  return (
    <div className='flex-1 overflow-y-auto pr-4'>
      
    </div>
  )
}

export default ChatMessages