import { Hash } from 'lucide-react';
import MobileToggle from '../mobile-toggle';
import UserAvatar from '../user-avatar';
import SocketIndicator from '../socket-indicator';
import ChatVideoButton from './chat-video-button';

type ChatHeaderProps = {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
};
const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div
      className="text-md font-semibold px-3 flex 
        items-center border-neutral-200 h-12
        dark:border-neutral-800 border-b-2"
    >
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === 'conversation' && (
        <UserAvatar
          imageUrl={imageUrl}
          className="w-8 h-8 md:h-8 md:w-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === 'conversation' && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
