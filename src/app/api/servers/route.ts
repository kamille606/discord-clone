import {NextResponse} from 'next/server'
import {MemberRole} from '@prisma/client'
import {v4 as uuid4} from 'uuid'

import {currentProfile} from '@/lib/current-profile'
import {db} from '@/lib/db'

export async function POST(req: Request) {
  try {
    const {name, imageUrl} = await req.json()
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('验证失败', {status: 401})
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name: name,
        imageUrl: imageUrl,
        inviteCode: uuid4(),
        channels: {
          create: [
            {name: 'general', profileId: profile.id}
          ]
        },
        members: {
          create: [
            {profileId: profile.id, role: MemberRole.ADMIN}
          ]
        }
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVERS POST]', error)
    return new NextResponse('服务器错误', {status: 500})
  }
}