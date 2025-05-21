import Head from 'next/head'
import Link from 'next/link'
import type { JSX } from 'react'
import type { GetServerSideProps, NextPage } from 'next'

import { FadeIn } from '@/components/animation'
import { withSSRGuest } from '@/utils/with-ssr'
import { FormSignIn, GoogleButton } from '@/components/pages/sign-in'

const SignIn: NextPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Entrar | GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex min-h-svh flex-col'>
				<main className='bg-muted grid flex-1 grid-cols-1 lg:grid-cols-2 lg:p-4'>
					<div className='hidden flex-1 items-center justify-center lg:flex'>
						<h2>Sign In Page</h2>
					</div>

					<div className='bg-background relative flex flex-1 flex-col border p-4 lg:rounded-md lg:p-8'>
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
							<FormSignIn />
							<span className='text-muted-foreground before:bg-border after:bg-border my-6 inline-flex w-full max-w-sm items-center gap-2 truncate text-sm before:h-[1px] before:w-full before:content-[""] after:h-[1px] after:w-full after:content-[""]'>
								Ou entre com
							</span>
							<GoogleButton />
							<span className='text-muted-foreground mt-6 w-full max-w-sm text-center text-sm'>
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

export default SignIn

export const getServerSideProps: GetServerSideProps = withSSRGuest(async () => {
	return {
		props: {}
	}
})
