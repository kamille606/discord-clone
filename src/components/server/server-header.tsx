'use client'

import {MemberRole} from '@prisma/client'
import {
  ChevronDown, LogOut,
  PlusCircle,
  Settings, Trash,
  UserPlus,
  Users
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {ServerWithMembersWithProfiles} from '@/types'
import {useModal} from '@/hooks/use-modal-store'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles
  role?: MemberRole
}

const ServerHeader = (
  {
    server,
    role
  }: ServerHeaderProps) => {

  const {onOpen} = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role == MemberRole.MODERATIR


  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='focus:outline-none'
        asChild={true}
      >
        <button
          className='w-full textmd font-semibold px-3 flex items-center
          h-12 border-neutral-200
          dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10
          dark:hover:bg-zinc-700/50 transition'
        >
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto'/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 text-xs font-medium text-black
        dark:text-neutral-400 space-y-[2px]'
      >
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', {server})}
            className='text-indigo-600 dark:text-indigo-400
            px-3 py-2 text-sm cursor-pointer'
          >
            邀请用户
            <UserPlus className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
          >
            服务器设置
            <Settings className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
          >
            成员管理
            <Users className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
          >
            创建频道
            <PlusCircle className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuSeparator/>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
          >
            删除服务器
            <Trash className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
          >
            离开服务器
            <LogOut className='h-4 w-4 ml-auto'/>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader