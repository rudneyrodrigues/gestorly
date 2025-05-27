import Head from 'next/head'
import Link from 'next/link'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { withSSRAuth } from '@/utils/with-ssr'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import type { NextPageWithLayout } from '@/types'
import { withCompany } from '@/utils/with-company'
import { Layout } from '@/components/pages/layout'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { useGetProducts } from '@/hooks/swr/use-get-products'
import { columns, DataTable } from '@/components/pages/products'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const Product: NextPageWithLayout = (): JSX.Element => {
	const isMobile = useIsMobile()
	const { error, loading, products } = useGetProducts()

	if (loading) {
		return (
			<>
				<Head>
					<title>
						Carregando produtos | GestorLy - Seu gestor de empresas online
					</title>
					<meta
						property='og:title'
						content='Carregando produtos | GestorLy - Seu gestor de empresas online'
						key='title'
					/>
				</Head>

				<div className='flex flex-1 flex-col'>
					<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
						<div className='flex items-center justify-between gap-2 rounded-md'>
							<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
								Produtos
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

	if (error || !products) {
		return (
			<>
				<Head>
					<title>
						Erro ao carregar produtos | GestorLy - Seu gestor de empresas online
					</title>
					<meta
						property='og:title'
						content='Erro ao carregar produtos | GestorLy - Seu gestor de empresas online'
						key='title'
					/>
				</Head>

				<div className='flex flex-1 flex-col'>
					<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
						<div className='flex items-center justify-between gap-2 rounded-md'>
							<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
								Produtos
							</h2>

							<Skeleton className='h-10 w-full max-w-40' />
						</div>

						<section className='w-full flex-1 rounded-md'>
							<Alert variant='destructive'>
								<Icon.alert />
								<AlertTitle>Erro ao carregar produtos</AlertTitle>
								<AlertDescription>
									Ocorreu um erro ao carregar os produtos na aplicação. Tente
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
				<title>Produtos | GestorLy - Seu gestor de empresas online</title>
				<meta
					property='og:title'
					content='Produtos | GestorLy - Seu gestor de empresas online'
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Produtos
						</h2>

						<Link href='/products/create' passHref>
							<Button
								variant='secondary'
								size={isMobile ? 'icon' : 'default'}
								className='cursor-pointer'
							>
								<span className={cn('hidden', !isMobile && 'inline-flex')}>
									Adicionar produto
								</span>
								<Icon.plus />
							</Button>
						</Link>
					</div>

					<section className='w-full flex-1 rounded-md'>
						<DataTable columns={columns} data={products} />
					</section>
				</main>
			</div>
		</>
	)
}
Product.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Product

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
