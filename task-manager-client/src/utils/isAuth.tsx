'use client'

import { getCookie } from 'cookies-next'

export const isAuth = () => {
  const userId = getCookie('userId')

  if (userId) {
    return userId
  }

  return undefined
}
