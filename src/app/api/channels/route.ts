import {NextResponse} from 'next/server'
import {currentProfile} from '@/lib/current-profile'
import {db} from '@/lib/db'
import {MemberRole} from '@prisma/client'

export async function POST(
  req: Request
) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse('验证失败', {status: 401})
    }

    const {searchParams} = new URL(req.url)
    const serverId = searchParams.get('serverId')
    if (!serverId) {
      return new NextResponse('缺少参数', {status: 400})
    }

    const {name, type} = await req.json()
    if (name === 'general') {
      return new NextResponse(`名称不能为 'general'`, {status: 400})
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    })

  } catch (error) {
    console.log('[CHANNELS_ID_PATCH]', error)
    return new NextResponse('服务器错误', {status: 500})
  }
}