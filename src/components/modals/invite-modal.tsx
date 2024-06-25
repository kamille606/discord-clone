'use client'

import {useModal} from '@/hooks/use-modal-store'
import {useOrigin} from '@/hooks/use-origin'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Copy, RefreshCcw} from 'lucide-react'


export const InviteModal = () => {

  const {isOpen, onClose, type, data} = useModal()
  const origin = useOrigin()

  const isModalOpen = isOpen && type === 'invite'

  const {server} = data

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            邀请用户
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label
            className='uppercase text-xs font-bold
            text-zinc-500 dark:text-secondary/70'
          >
            服务器邀请链接
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              className='bg-zinc-300/50 border-0
               focus-visible:ring-0 text-black
               focus-visible:ring-offset-0'
              value={inviteUrl}
            />
            <Button size='icon'>
              <Copy className='w-4 h-4'/>
            </Button>
          </div>
          <Button
            variant='link'
            size='sm'
            className='text-xs text-zinc-500 mt-4'
          >
            生成链接
            <RefreshCcw className='w-4 h-4 ml-2'/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
