import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { lazy, Suspense, type JSX, type ReactElement } from 'react'

import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { withCompany } from '@/utils/with-company'
import { Layout } from '@/components/pages/layout'
import { FormCreateCustomerSkeleton } from '@/components/pages/create-customer'

const FormCreateCustomer = lazy(
	() => import('@/components/pages/create-customer/form')
)

const CreateCustomer: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>
					Cadastrar cliente | GestorLy - Seu gestor de empresas online
				</title>
				<meta
					key='title'
					property='og:title'
					content='Cadastrar cliente | GestorLy - Seu gestor de empresas online'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Cadastrar cliente
						</h2>
					</div>

					<section className='w-full flex-1 rounded-md'>
						<Suspense fallback={<FormCreateCustomerSkeleton />}>
							<FormCreateCustomer />
						</Suspense>
					</section>
				</main>
			</div>
		</>
	)
}
CreateCustomer.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default CreateCustomer

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
