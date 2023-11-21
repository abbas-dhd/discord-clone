import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
import MediaRoom from '@/components/media-room';
import { getOrCreateConversation } from '@/lib/conversations';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

type MemberIdProps = {
  params: {
    serverId: string;
    memberId: string;
  };
  searchParams: {
    video?: string;
  };
};
const MemberId = async ({ params, searchParams }: MemberIdProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect('/');
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;
  const OtherMember =
    memberOne.profile.id === profile?.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={OtherMember.profile.imageUrl}
        name={OtherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />

      {searchParams.video === 'true' && (
        <MediaRoom chatId={conversation.id} audio={true} video={true} />
      )}
      {searchParams.video === 'false' && (
        <>
          <ChatMessages
            member={currentMember}
            name={OtherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={OtherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default MemberId;
