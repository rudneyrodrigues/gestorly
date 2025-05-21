import { toast } from 'sonner'
import { memo, type FC, type JSX } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

const GoogleButton: FC = memo((): JSX.Element => {
	const { loading, loginWithGoogle } = useAuth()

	const handleGoogleSignIn = async () => {
		await loginWithGoogle()
			.then()
			.catch(error => {
				if (error.code === 'auth/popup-closed-by-user') {
					toast.error('Login com Google cancelado', {
						description: 'Você fechou a janela de login do Google.'
					})
					return
				}

				toast.error('Erro ao fazer login com o Google', {
					description:
						'Verifique se você tem uma conta Google válida ou tente novamente mais tarde.'
				})
			})
	}

	return (
		<Button
			type='button'
			leftIcon='google'
			variant='outline'
			loading={loading}
			onClick={handleGoogleSignIn}
			className='w-full max-w-sm'
		>
			Google
		</Button>
	)
})
GoogleButton.displayName = 'GoogleButton'

export { GoogleButton }
