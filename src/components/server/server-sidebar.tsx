import {auth} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'
import {ChannelType, MemberRole} from '@prisma/client'
import {Hash, Mic, ShieldAlert, ShieldCheck, Video} from 'lucide-react'

import ServerHeader from '@/components/server/server-header'
import ServerSearch from '@/components/server/server-search'
import {ScrollArea} from '@/components/ui/scroll-area'
import {currentProfile} from '@/lib/current-profile'
import {db} from '@/lib/db'

interface ServerSidebarProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4'/>,
  [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4'/>,
  [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4'/>
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500'/>,
  [MemberRole.ADMIN]: <ShieldAlert className='h-4 w-4 mr-2 text-indigo-500'/>,
}

export const ServerSidebar = async (
  {
    serverId
  }: ServerSidebarProps) => {

  const profile = await currentProfile()
  if (!profile) {
    return auth().redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc'
        }
      },
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: 'asc'
        }
      }
    }
  })

  if (!server) {
    return redirect('/')
  }

  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
  const members = server?.members.filter((member) => member.profileId !== profile.id)

  const role = server.members.find((member) => member.profileId === profile.id)?.role

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader
        server={server}
        role={role}
      />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: '文字频道',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: '音频频道',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: '视频频道',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type]
                }))
              },
              {
                label: '成员',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role]
                }))
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
