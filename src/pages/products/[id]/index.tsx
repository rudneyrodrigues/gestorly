import Head from 'next/head'
import { parseCookies } from 'nookies'
import type { GetServerSideProps } from 'next'
import { lazy, Suspense, type JSX, type ReactElement } from 'react'

import { withSSRAuth } from '@/utils/with-ssr'
import { firestore } from '@/lib/firebase-admin'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'
import { Skeleton } from '@/components/ui/skeleton'
import type { NextPageWithLayout, Product } from '@/types'

const InfoSection = lazy(
	() => import('@/components/pages/view-product/info-section')
)

interface IProductId {
	product: Product
}

const ProductId: NextPageWithLayout<IProductId> = ({
	product
}): JSX.Element => {
	return (
		<>
			<Head>
				<title>{product.name} | GestorLy - Seu gestor de empresas online</title>
				<meta
					property='og:title'
					content={`${product.name} | GestorLy - Seu gestor de empresas online`}
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex gap-6 px-3 py-6'>
					<div className='flex-1'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							{product.name}
						</h2>
					</div>

					<Suspense fallback={<Skeleton className='h-full w-full max-w-80' />}>
						<InfoSection product={product} />
					</Suspense>
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
			} as Product

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
