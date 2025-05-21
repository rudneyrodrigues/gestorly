import Head from 'next/head'
import Link from 'next/link'
import type { JSX } from 'react'
import type { GetServerSideProps, NextPage } from 'next'

import { FadeIn } from '@/components/animation'
import { withSSRGuest } from '@/utils/with-ssr'
import { Separator } from '@/components/ui/separator'
import { FormSignUp } from '@/components/pages/sign-up'

const SignUp: NextPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Cadastrar-se | GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex min-h-svh flex-col'>
				<main className='bg-muted grid flex-1 grid-cols-1 md:grid-cols-2 md:p-4'>
					<div className='hidden flex-1 items-center justify-center md:flex'>
						<h2>Sign Up Page</h2>
					</div>

					<div className='bg-background relative flex flex-1 flex-col border p-4 md:rounded-md md:p-8'>
						<FadeIn
							to='top'
							delay={0.1}
							duration={0.5}
							className='mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center'
						>
							<div className='mb-8 flex w-full max-w-sm flex-col items-center justify-center'>
								<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
									GestorLy
								</h2>
							</div>
							<FormSignUp />
							<Separator className='my-6' />
							<span className='text-muted-foreground w-full max-w-sm text-center text-sm'>
								Ao fazer login, você concorda com os nossos{' '}
								<Link
									href=''
									className='hover:text-primary underline underline-offset-4 transition-colors'
								>
									Termos de Serviço
								</Link>
								,{' '}
								<Link
									href=''
									className='hover:text-primary underline underline-offset-4 transition-colors'
								>
									Política de Privacidade
								</Link>{' '}
								e{' '}
								<Link
									href=''
									className='hover:text-primary underline underline-offset-4 transition-colors'
								>
									Política de Cookies
								</Link>
								.
							</span>
						</FadeIn>
					</div>
				</main>
			</div>
		</>
	)
}

export default SignUp

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
	return {
		props: {}
	}
})
