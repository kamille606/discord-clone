import {NextResponse} from 'next/server'
import {v4 as uuid4} from 'uuid'

import {currentProfile} from '@/lib/current-profile'
import {db} from '@/lib/db'

export async function PATCH(
  req: Request,
  {params}: { params: { serverId: string } }
) {
  try {
    if (!params.serverId) {
      return new NextResponse('缺少参数', {status: 401})
    }

    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse('未验证', {status: 401})
    }

    const server = await db.server.update({
      where: {
        id:params.serverId,
        profileId:profile.id
      },
      data: {
        inviteCode: uuid4()
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID]', error)
    return new NextResponse('网络错误', {status: 500})
  }
}
