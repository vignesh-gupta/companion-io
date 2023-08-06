import React from "react";
import { Avatar, AvatarImage } from "@ui/avatar";

const BotAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
