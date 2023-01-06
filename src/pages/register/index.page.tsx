import * as z from 'zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import { Container, Form, FormError, Header } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, 'O nome precisa ter pelo menos 3 letras.'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome do usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />
          {errors.username && <FormError>{errors.username.message}</FormError>}
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
        </Button>
      </Form>
    </Container>
  )
}
