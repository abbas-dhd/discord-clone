import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidV4 } from 'uuid';
import { MemberRole } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidV4(),
        channels: {
          create: {
            name: 'general',
            profileId: profile.id,
          },
        },
        members: {
          create: {
            profileId: profile.id,
            role: MemberRole.ADMIN,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(server), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[SERVER_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
