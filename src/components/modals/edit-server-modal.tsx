'use client'

import * as zod from 'zod'
import axios from 'axios'
import {useEffect} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/navigation'
import {useModal} from '@/hooks/use-modal-store'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import FileUpload from '@/components/file-upload'

const formSchema = zod.object({
  name: zod.string().min(1, {
    message: '缺少服务器名称'
  }),
  imageUrl: zod.string().min(1, {
    message: '缺少图片地址'
  })
})

export const EditServerModal = () => {

  const {isOpen, onClose, type, data} = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'editServer'
  const {server} = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values)
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            自定义您的服务器
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            服务器设置
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  control={form.control}
                  name='imageUrl'
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='serverImage'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel
                      className='uppercase text-xs font-bold text-zinc-500
                    dark:text-secondary/70'
                    >
                      服务器名称
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className='bg-zinc-300/50 border-0
                        focus-visible:ring-0 text-black
                        focus-visible:ring-offset-0'
                        placeholder='请输入服务器名称'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button variant='primary' disabled={isLoading}>
                保存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
