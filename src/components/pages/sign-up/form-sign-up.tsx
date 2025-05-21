import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { memo, type FC, type JSX } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	signUpSchema,
	type SignUpSchemaType
} from '@/utils/validations/sign-up'

const FormSignUp: FC = memo((): JSX.Element => {
	const { loading, registerWithEmailAndPassword } = useAuth()
	const form = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const onSubmit = async (values: SignUpSchemaType) => {
		await registerWithEmailAndPassword(
			values.name,
			values.email,
			values.password
		)
			.then()
			.catch(error => {
				if (error.message === 'auth/email-already-in-use') {
					return toast.error('E-mail já cadastrado')
				}

				if (error.message === 'auth/admin-restricted-operation') {
					return toast.error('Operação restrita para administradores')
				}

				return toast.error(error.message)
			})
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='w-full max-w-sm space-y-6'
		>
			<div className='space-y-4'>
				<Input
					type='text'
					icon='user'
					label='Nome'
					autoComplete='name'
					placeholder='John Doe'
					{...form.register('name')}
					error={form.formState.errors.name}
					disabled={loading || form.formState.isSubmitting}
				/>
				<Input
					type='email'
					label='E-mail'
					icon='envelope'
					autoComplete='email'
					placeholder='johndoe@example.com'
					{...form.register('email')}
					error={form.formState.errors.email}
					disabled={loading || form.formState.isSubmitting}
				/>
				<Input
					icon='lock'
					label='Senha'
					type='password'
					placeholder='********'
					autoComplete='new-password'
					{...form.register('password')}
					error={form.formState.errors.password}
					disabled={loading || form.formState.isSubmitting}
				/>
				<Input
					icon='lock'
					type='password'
					placeholder='********'
					label='Confirmar Senha'
					autoComplete='new-password'
					{...form.register('confirmPassword')}
					error={form.formState.errors.confirmPassword}
					disabled={loading || form.formState.isSubmitting}
				/>
			</div>

			<Button
				type='submit'
				loading={form.formState.isSubmitting || loading}
				className='w-full'
			>
				Cadastrar
			</Button>

			<span className='text-muted-foreground w-full text-center text-sm'>
				Já possui uma conta?{' '}
				<Link
					href='/sign-in'
					className='hover:text-primary underline underline-offset-4'
				>
					Clique aqui
				</Link>
			</span>
		</form>
	)
})
FormSignUp.displayName = 'FormSignUp'

export { FormSignUp }
