import React from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
  imageUrl?: string;
  className?: string;
};

const UserAvatar = ({ imageUrl, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10 ', className)}>
      <AvatarImage src={imageUrl} alt="user profile" />
    </Avatar>
  );
};

export default UserAvatar;
