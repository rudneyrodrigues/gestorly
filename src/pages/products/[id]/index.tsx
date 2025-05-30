import Head from 'next/head'
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
import { lazy, Suspense, type JSX, type ReactElement } from 'react'

import { Icon } from '@/components/ui/icon'
import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProductById } from '@/hooks/swr/use-get-product-by-id'
import { FormSkeleton } from '@/components/pages/view-product/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const FormViewProduct = lazy(
	() => import('@/components/pages/view-product/form')
)
const InfoSection = lazy(
	() => import('@/components/pages/view-product/info-section')
)
const GallerySection = lazy(
	() => import('@/components/pages/view-product/gallery-section')
)

const ProductId: NextPageWithLayout = (): JSX.Element => {
	const router = useRouter()
	const { error, loading, product } = useGetProductById(
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
							<Skeleton className='h-10 w-40' />

							<div className='mx-auto flex w-full flex-col items-center justify-center gap-6'>
								<FormSkeleton />
							</div>
						</div>

						<div className='hidden w-full max-w-80 flex-col gap-6 xl:flex'>
							<Skeleton className='h-80 w-full' />
							<Skeleton className='h-80 w-full' />
						</div>
					</main>
				</div>
			</>
		)
	}

	if (error || !product) {
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
						<AlertTitle>Erro ao carregar os dados do produto</AlertTitle>
						<AlertDescription>
							Ocorreu um erro ao tentar carregar os dados do produto. Por favor,
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
					Detalhes - {product.name} | GestorLy - Seu gestor de empresas online
				</title>
				<meta
					property='og:title'
					content={`Detalhes - ${product.name} | GestorLy - Seu gestor de empresas online`}
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-col gap-6 px-3 py-6 xl:flex-row'>
					<div className='flex flex-1 flex-col gap-6'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							{product.name}
						</h2>

						<div className='mx-auto flex w-full flex-col items-center justify-center gap-6'>
							<h3 className='w-full scroll-m-20 border-b pb-2 text-center text-2xl font-semibold tracking-tight'>
								Dados do produto
							</h3>

							<Suspense fallback={<FormSkeleton />}>
								<FormViewProduct defaultValues={product} />
							</Suspense>
						</div>
					</div>

					<div className='hidden w-full max-w-80 flex-col gap-6 xl:flex'>
						<Suspense fallback={<Skeleton className='h-80 w-full max-w-80' />}>
							<InfoSection product={product} />
						</Suspense>
						<Suspense fallback={<Skeleton className='h-80 w-full max-w-80' />}>
							<GallerySection images={product.images} />
						</Suspense>
					</div>
				</main>
			</div>
		</>
	)
}
ProductId.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default ProductId

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
