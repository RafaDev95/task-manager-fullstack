'use client'

import { useEffect, useState } from 'react'

import { AuthModal } from '@/components'

const ModalsProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
    </>
  )
}
export default ModalsProvider
