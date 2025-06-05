import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import type { JSX, ReactElement } from 'react'

import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'

const Sales: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Vendas | GestorLy - Seu gestor de empresas online</title>
				<meta
					property='og:title'
					content='Vendas | GestorLy - Seu gestor de empresas online'
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Vendas
						</h2>
					</div>

					<section className='w-full flex-1 overflow-x-auto rounded-md'></section>
				</main>
			</div>
		</>
	)
}
Sales.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Sales

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
