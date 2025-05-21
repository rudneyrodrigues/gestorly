import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { memo, type FC, type JSX } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	signInSchema,
	type SignInSchemaType
} from '@/utils/validations/sign-in'

const FormSignIn: FC = memo((): JSX.Element => {
	const { loading, loginWithEmailAndPassword } = useAuth()

	const form = useForm<SignInSchemaType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (values: SignInSchemaType) => {
		await loginWithEmailAndPassword(values.email, values.password)
			.then()
			.catch(error => {
				if (error.message === 'auth/wrong-password') {
					toast.error('Senha incorreta', {
						description: 'Verifique sua senha e tente novamente.'
					})
					return
				}
				if (error.message === 'auth/user-not-found') {
					toast.error('Usuário não encontrado', {
						description: 'Verifique seu e-mail e tente novamente.'
					})
					return
				}

				toast.error('Erro ao fazer login', {
					description:
						'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.'
				})
			})
	}

	return (
		<form
			className='w-full max-w-sm space-y-6'
			onSubmit={form.handleSubmit(onSubmit)}
		>
			<div className='space-y-4'>
				<Input
					type='email'
					label='E-mail'
					icon='envelope'
					{...form.register('email')}
					placeholder='johndoe@example.com'
					error={form.formState.errors.email}
					disabled={loading || form.formState.isSubmitting}
				/>
				<Input
					icon='lock'
					label='Senha'
					type='password'
					placeholder='********'
					{...form.register('password')}
					error={form.formState.errors.password}
					disabled={loading || form.formState.isSubmitting}
				/>
			</div>

			<Button
				type='submit'
				loading={form.formState.isSubmitting}
				className='w-full'
			>
				Entrar
			</Button>

			<span className='text-muted-foreground text-sm'>
				Não possui login?{' '}
				<Link
					href='/sign-up'
					className='hover:text-primary underline underline-offset-4'
				>
					Crie uma conta
				</Link>
			</span>
		</form>
	)
})
FormSignIn.displayName = 'FormSignIn'

export { FormSignIn }
