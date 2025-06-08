import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { Icon } from '@/components/ui/icon'
import { ImageDialog } from '@/components/app'
import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCustomerById } from '@/hooks/swr/use-get-customer-by-id'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const CustomerId: NextPageWithLayout = (): JSX.Element => {
	const router = useRouter()
	const { error, loading, customer } = useGetCustomerById(
		router.query.id as string
	)

	if (loading) {
		return (
			<>
				<Head>
					<title>
						Carregando... | GestorLy - Seu gestor de empresas online
					</title>
					<meta
						property='og:title'
						content='Carregando... | GestorLy - Seu gestor de empresas online'
						key='title'
					/>
				</Head>

				<div className='flex flex-1 flex-col'>
					<main className='container mx-auto flex flex-col gap-6 px-3 py-6 xl:flex-row'>
						<div className='flex flex-1 flex-col gap-6'>
							<Skeleton className='h-10 w-96' />

							<div className='mx-auto flex w-full flex-col items-center justify-center gap-6'>
								{/* <FormSkeleton /> */}
							</div>
						</div>

						<div className='hidden w-full max-w-80 flex-col gap-6 xl:flex'>
							<Skeleton className='h-80 w-full' />
						</div>
					</main>
				</div>
			</>
		)
	}

	if (error || !customer) {
		return (
			<>
				<Head>
					<title>
						Erro no carregamento dos dados | GestorLy - Seu gestor de empresas
						online
					</title>
					<meta
						property='og:title'
						content='Erro no carregamento dos dados | GestorLy - Seu gestor de empresas online'
						key='title'
					/>
				</Head>

				<div className='flex flex-1 flex-col p-4'>
					<Alert variant='destructive' className='mx-auto max-w-2xl'>
						<Icon.alert />
						<AlertTitle>Erro ao carregar os dados do cliente</AlertTitle>
						<AlertDescription>
							Ocorreu um erro ao tentar carregar os dados do cliente. Por favor,
							tente novamente mais tarde.
						</AlertDescription>
					</Alert>
				</div>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>
					Detalhes - {customer.name} | GestorLy - Seu gestor de empresas online
				</title>
				<meta
					property='og:title'
					content={`Detalhes - ${customer.name} | GestorLy - Seu gestor de empresas online`}
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-col gap-6 px-3 py-6 xl:flex-row'>
					<div className='flex flex-1 flex-col gap-6'>
						<div className='flex items-center gap-2'>
							<ImageDialog
								className='size-10 cursor-pointer rounded-full opacity-80 hover:opacity-100'
								imageUrl={customer.avatar || '/images/avatar-placeholder.png'}
							>
								<Image
									width={40}
									height={40}
									alt={`Avatar de ${customer.name}`}
									src={customer.avatar || '/images/avatar-placeholder.png'}
									className='size-10 rounded-full'
								/>
							</ImageDialog>

							<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 md:text-3xl'>
								{customer.name}
							</h2>
						</div>

						<div className='mx-auto flex w-full flex-col items-center justify-center gap-6'>
							<h3 className='w-full scroll-m-20 border-b pb-2 text-center text-2xl font-semibold tracking-tight'>
								Histórico de Compras
							</h3>
						</div>
					</div>

					<div className='hidden w-full max-w-80 flex-col gap-6 xl:flex'></div>
				</main>
			</div>
		</>
	)
}
CustomerId.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default CustomerId

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
