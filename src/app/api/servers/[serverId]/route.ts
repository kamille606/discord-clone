import {NextResponse} from 'next/server'
import {currentProfile} from '@/lib/current-profile'
import {db} from '@/lib/db'

export async function PATCH(
  req: Request,
  {params}: { params: { serverId: string } }
) {
  try {
    if (!params.serverId) {
      return new NextResponse('缺少参数', {status: 400})
    }

    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse('验证失败', {status: 401})
    }

    const {name, imageUrl} = await req.json()
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID_PATCH]', error)
    return new NextResponse('服务器错误', {status: 500})
  }
}
