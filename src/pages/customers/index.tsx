import Head from 'next/head'
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
import type { JSX, ReactElement } from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { withSSRAuth } from '@/utils/with-ssr'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useGetCustomers } from '@/hooks/swr/use-get-customers'
import { columns, DataTable } from '@/components/pages/customers'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Customers: NextPageWithLayout = (): JSX.Element => {
	const isMobile = useIsMobile()
	const { error, loading, customers } = useGetCustomers()

	if (loading) {
		return (
			<>
				<Head>
					<title>
						Carregando clientes | GestorLy - Seu gestor de empresas online
					</title>
					<meta
						property='og:title'
						content='Carregando clientes | GestorLy - Seu gestor de empresas online'
						key='title'
					/>
				</Head>

				<div className='flex flex-1 flex-col'>
					<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
						<div className='flex items-center justify-between gap-2 rounded-md'>
							<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
								Clientes
							</h2>

							<Skeleton className='h-10 w-full max-w-40' />
						</div>

						<section className='w-full flex-1 rounded-md'>
							<div className='w-full space-y-4'>
								<div className='flex items-center justify-between gap-2'>
									<Skeleton className='mb-4 h-10 w-full max-w-40' />

									<Skeleton className='ml-auto min-h-8 w-full max-w-40' />
								</div>

								<div className='space-y-4 rounded-md border p-2'>
									<Skeleton className='h-10 w-full' />

									<Separator />

									{Array.from({ length: 5 }).map((_, index) => (
										<Skeleton key={index} className='h-10 w-full' />
									))}
								</div>
							</div>
						</section>
					</main>
				</div>
			</>
		)
	}

	if (error || !customers) {
		return (
			<>
				<Head>
					<title>
						Erro ao carregar clientes | GestorLy - Seu gestor de empresas online
					</title>
					<meta
						property='og:title'
						content='Erro ao carregar clientes | GestorLy - Seu gestor de empresas online'
						key='title'
					/>
				</Head>

				<div className='flex flex-1 flex-col'>
					<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
						<div className='flex items-center justify-between gap-2 rounded-md'>
							<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
								Clientes
							</h2>

							<Skeleton className='h-10 w-full max-w-40' />
						</div>

						<section className='w-full flex-1 rounded-md'>
							<Alert variant='destructive'>
								<Icon.alert />
								<AlertTitle>Erro ao carregar clientes</AlertTitle>
								<AlertDescription>
									Ocorreu um erro ao carregar os clientes na aplicação. Tente
									novamente mais tarde
								</AlertDescription>
							</Alert>
						</section>
					</main>
				</div>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>Clientes | GestorLy - Seu gestor de empresas online</title>
				<meta
					property='og:title'
					content='Clientes | GestorLy - Seu gestor de empresas online'
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Clientes
						</h2>

						<Link href='customers/create' passHref>
							<Button
								variant='secondary'
								size={isMobile ? 'icon' : 'default'}
								className='cursor-pointer'
							>
								<span className={cn('hidden', !isMobile && 'inline-flex')}>
									Adicionar cliente
								</span>
								<Icon.plus />
							</Button>
						</Link>
					</div>

					<section className='w-full flex-1 overflow-x-auto rounded-md'>
						<DataTable columns={columns} data={customers} />
					</section>
				</main>
			</div>
		</>
	)
}
Customers.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Customers

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
