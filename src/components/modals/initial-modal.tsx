'use client'

import {useForm} from 'react-hook-form'
import * as zod from "zod";
import {zodResolver} from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const formSchema = zod.object({
  name: zod.string().min(1, {
    message: "缺少服务器名称"
  }),
  imageUrl: zod.string().min(1, {
    message: "缺少图片地址"
  })
})



const InitialModal = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    }
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
   <Dialog open>
     <DialogContent className='bg-white text-black p-0 overflow-hidden'>
       <DialogHeader className='pt-8 px-6'>
         <DialogTitle className='text-2xl text-center font-bold'>
           Customize your server
         </DialogTitle>
         <DialogDescription className='text-center text-zinc-500'>
           你好
         </DialogDescription>
       </DialogHeader>
     </DialogContent>
   </Dialog>
  )
}

export default InitialModal