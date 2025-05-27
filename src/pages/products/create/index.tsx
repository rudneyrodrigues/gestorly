import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { lazy, Suspense, type JSX, type ReactElement } from 'react'

import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { withCompany } from '@/utils/with-company'
import { Layout } from '@/components/pages/layout'
import { FormCreateProductSkeleton } from '@/components/pages/create-product'

const FormCreateProduct = lazy(
	() => import('@/components/pages/create-product/form')
)

const Create: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>
					Cadastrar produto | GestorLy - Seu gestor de empresas online
				</title>
				<meta
					key='title'
					property='og:title'
					content='Cadastrar produto | GestorLy - Seu gestor de empresas online'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Cadastrar produto
						</h2>
					</div>

					<section className='w-full flex-1 rounded-md'>
						<Suspense fallback={<FormCreateProductSkeleton />}>
							<FormCreateProduct />
						</Suspense>
					</section>
				</main>
			</div>
		</>
	)
}
Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Create

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
