import Head from 'next/head'
import { parseCookies } from 'nookies'
import type { GetServerSideProps } from 'next'
import { lazy, Suspense, type JSX, type ReactElement } from 'react'

import { Icon } from '@/components/ui/icon'
import { withSSRAuth } from '@/utils/with-ssr'
import { firestore } from '@/lib/firebase-admin'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'
import { Skeleton } from '@/components/ui/skeleton'
import type { NextPageWithLayout, Product } from '@/types'

const FormViewProduct = lazy(
	() => import('@/components/pages/view-product/form')
)
const InfoSection = lazy(
	() => import('@/components/pages/view-product/info-section')
)
const GallerySection = lazy(
	() => import('@/components/pages/view-product/gallery-section')
)

type ProductWithImages = Product & {
	images: string[]
}

interface IProductId {
	product: ProductWithImages
}

const ProductId: NextPageWithLayout<IProductId> = ({
	product
}): JSX.Element => {
	return (
		<>
			<Head>
				<title>
					Detalhes - {product.name} | GestorLy - Seu gestor de empresas online
				</title>
				<meta
					property='og:title'
					content={`${product.name} | GestorLy - Seu gestor de empresas online`}
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

							<Suspense fallback={<Icon.loading className='animate-spin' />}>
								<FormViewProduct defaultValues={product} />
							</Suspense>
						</div>
					</div>

					<div className='hidden max-w-80 flex-col gap-6 xl:flex'>
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
	withCompany(async ctx => {
		const cookies = parseCookies(ctx)
		const userUid = cookies['@user.uid']

		if (!userUid) {
			return {
				redirect: {
					destination: '/sign-in',
					permanent: false
				}
			}
		}

		const { id } = ctx.query

		if (!id) {
			return {
				redirect: {
					destination: '/products',
					permanent: false
				}
			}
		}

		try {
			const productRef = firestore.collection('products').doc(id as string)

			const snapshot = await productRef.get()

			if (!snapshot.exists) {
				return {
					redirect: {
						destination: '/products',
						permanent: false
					}
				}
			}

			const product = {
				id: snapshot.id,
				...snapshot.data()
			} as ProductWithImages

			return {
				props: { product }
			}
		} catch (error) {
			console.error('Error fetching product:', error)

			return {
				redirect: {
					destination: '/products',
					permanent: false
				}
			}
		}
	})
)
