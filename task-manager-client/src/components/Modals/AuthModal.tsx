'use client'

import { setCookie } from 'cookies-next'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Box, Typography, useTheme } from '@mui/material'

import { authErrorMessages } from '@/auth/firebase/errorMessages'
import useAuthModalStore from '@/shared/hooks/useAuthModalStore'
import BaseModal from './BaseModal'
import Input from '../Input'
import { registerUser } from '@/auth/firebase/registerUser'
import { login } from '@/auth/firebase/login'
import toast from 'react-hot-toast'

const AuthSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Campo obrigatório'),
  password: z.string().min(5, 'Precisa ter 5 caracteres ao menos').nonempty('Campo obrigatório'),
})

type AuthFormData = z.infer<typeof AuthSchema>

const requiredFields = [
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'password',
    label: 'Senha',
    type: 'password',
  },
]

const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { onClose, isOpen } = useAuthModalStore()
  const [isLogin, setIsLogin] = useState(true)
  const theme = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    control,
    clearErrors,
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
  })

  const handleLoginOrRegister = () => {
    setIsLogin((prev) => !prev)
    reset()
    clearErrors()
  }

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen])

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true)

    try {
      const response = isLogin
        ? await login(data.email, data.password)
        : await registerUser(data.email, data.password)

      const accessToken = await response.getIdToken()
      setCookie('token', accessToken)
      setCookie('userId', response.uid)

      !isLogin && toast.success('Cadastrado')

      onClose()
      reset()
    } catch (error: any) {
      console.error(error.code)
      if (error?.code && authErrorMessages[error.code as keyof typeof authErrorMessages]) {
        setError('email', {
          message: authErrorMessages[error.code as keyof typeof authErrorMessages],
        })
        setError('password', {
          message: authErrorMessages[error.code as keyof typeof authErrorMessages],
        })
      }
    }

    setIsLoading(false)
  }
  const bodyContent = (
    <>
      <Box
        component='form'
        sx={{
          display: 'flex',
          mt: 3,
          gap: 2,
          flexWrap: 'wrap',
          height: { sm: 80, xs: '100%' },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {requiredFields.map((requiredField) => (
          <Controller
            key={requiredField.id}
            name={requiredField.id as keyof AuthFormData}
            control={control}
            render={({ field }) => (
              <Input
                label={requiredField.label}
                id={requiredField.id}
                register={register}
                errors={errors}
                disabled={isLoading}
                type={requiredField.type ? requiredField.type : 'text'}
                {...field}
              />
            )}
          />
        ))}
        <Button disabled={isLoading} type='submit' sx={{ ml: 'auto', mb: 'auto' }} variant='action'>
          Enviar
        </Button>
      </Box>
      <Typography sx={{ mt: 3, color: theme.colors.text }}>
        {isLogin ? 'Ainda não possui uma conta?' : 'Já possui uma conta?'}
        <span
          style={{
            textDecoration: 'underline',
            color: 'lightBlue',
            letterSpacing: 1,
            cursor: 'pointer',
          }}
          onClick={handleLoginOrRegister}
        >
          {isLogin ? ' Cadastre-se' : ' Entre'}
        </span>
      </Typography>
    </>
  )

  return (
    <BaseModal
      onClose={onClose}
      isOpen={isOpen}
      title={isLogin ? 'Entrar' : 'Cadastre-se'}
      bodyContent={bodyContent}
    />
  )
}
export default AuthModal
