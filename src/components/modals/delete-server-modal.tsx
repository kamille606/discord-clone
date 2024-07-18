'use client'

import axios from 'axios'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useModal} from '@/hooks/use-modal-store'

import {
  Dialog,
  DialogContent, DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'

export const DeleteServerModal = () => {

  const router = useRouter()
  const {isOpen, onClose, type, data} = useModal()
  const isModalOpen = isOpen && type === 'deleteServer'

  const [isLoading, setIsLoading] = useState(false)
  const {server} = data

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)
      onClose()
      router.refresh()
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            删除服务器
          </DialogTitle>
          <DialogDescription>
            确定是否删除服务器?<br/>
            <span className='font-semibold text-indigo-500'>{server?.name}</span>将会永久删除
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button
              disabled={isLoading}
              variant='ghost'
              onClick={onClose}
            >
              取消
            </Button>
            <Button
              disabled={isLoading}
              variant='primary'
              onClick={onClick}
            >
              确认
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
