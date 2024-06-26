'use client'

import {useModal} from '@/hooks/use-modal-store'
import {ServerWithMembersWithProfiles} from '@/types'

import {
  Dialog,
  DialogContent, DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export const MembersModal = () => {

  const {onOpen, isOpen, onClose, type, data} = useModal()
  const isModalOpen = isOpen && type === 'members'
  const {server} = data as {server: ServerWithMembersWithProfiles}

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            成员管理
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            {server?.members?.length} 个成员
          </DialogDescription>
        </DialogHeader>
        <div className='p-6'>
          hello
        </div>
      </DialogContent>
    </Dialog>
  )
}
