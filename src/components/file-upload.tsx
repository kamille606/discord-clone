'use client'

import {X} from 'lucide-react'
import Image from 'next/image'

import {UploadDropzone} from '@/lib/uploadthing'

import '@uploadthing/react/styles.css'

interface FileUploadProps {
  value: string
  endpoint: 'messageFile' | 'serverImage'
  onChange: (url?: string) => void
}

const FileUpload = ({
                      value,
                      endpoint,
                      onChange
                    }: FileUploadProps) => {

  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image
          fill
          src={value}
          alt='upload'
          sizes='100%'
          priority={true}
          className='rounded-full'
        />
        <button
          type='button'
          onClick={() => onChange()}
          className='bg-rose-500 text-white p-1
          rounded-full absolute top-0 right-0 shadow-sm'
        >
          <X className='h-4 w-4'/>
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}

export default FileUpload