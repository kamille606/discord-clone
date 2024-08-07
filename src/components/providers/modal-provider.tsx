'use client'

import {useEffect, useState} from 'react'

import {CreateServerModal} from '@/components/modals/create-server-modal'
import {CreateChannelModal} from '@/components/modals/create-channel-modal'
import {LeaveServerModal} from '@/components/modals/leave-server-modal'
import {DeleteServerModal} from '@/components/modals/delete-server-modal'
import {EditServerModal} from '@/components/modals/edit-server-modal'
import {InviteModal} from '@/components/modals/invite-modal'
import {MembersModal} from '@/components/modals/members-modal'

export const ModalProvider = () => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateServerModal/>
      <CreateChannelModal/>
      <LeaveServerModal/>
      <DeleteServerModal/>
      <EditServerModal/>
      <InviteModal/>
      <MembersModal/>
    </>
  )
}