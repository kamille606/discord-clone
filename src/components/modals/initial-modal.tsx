'use client'

import * as zod from 'zod'
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'

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

export const InitialModal = () => {

  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)
      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            自定义您的服务器
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            服务器创建
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
                创建
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
