import Head from 'next/head'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { withCompany } from '@/utils/with-company'
import { Layout } from '@/components/pages/layout'

const Product: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Produtos | GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col'>
					<h2>Página de produtos</h2>
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
