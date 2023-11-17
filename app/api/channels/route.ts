import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name: channelName, type } = await request.json();
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get('serverId');
    if (!serverId) {
      return new NextResponse('Server ID Missing', { status: 400 });
    }

    if ((channelName as string).toLocaleLowerCase() === 'general') {
      return new NextResponse('Channel name cannot be "general"', {
        status: 400,
      });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name: channelName,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNELS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
