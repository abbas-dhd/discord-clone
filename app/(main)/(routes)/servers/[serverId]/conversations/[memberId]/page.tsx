import ChatHeader from '@/components/chat/chat-header';
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
};
const MemberId = async ({ params }: MemberIdProps) => {
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
    </div>
  );
};

export default MemberId;
