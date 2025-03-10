import { Liveblocks } from "@liveblocks/node";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCLS_SECRET_KEY });

export async function POST(req: Request) {
  const userSession = await auth();

  // get the users room, and invite to rooms
  const user = await db.user.findUniqueOrThrow({
    where: { id: userSession?.user.id },
  });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.email ?? "Anonymous",
    },
  });

  session.allow(`room:${"test"}`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
