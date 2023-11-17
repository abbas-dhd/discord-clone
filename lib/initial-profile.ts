import { currentUser, redirectToSignIn } from '@clerk/nextjs';

import { db } from './db';

export const initialProfile = async () => {
  const user = await currentUser();

  // check if user is signed in
  if (!user) {
    // if not, redirect to sign in page
    return redirectToSignIn();
  }

  // check if user has a profile
  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) {
    // if profile  exists, return
    return profile;
  }

  // if profile does not exist, create one
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
