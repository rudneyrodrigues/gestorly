import Head from 'next/head'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '@/types'
import { withSSRAuth } from '@/utils/with-ssr'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'

const ProductId: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>
					Detalhes do produto | GestorLy - Seu gestor de empresas online
				</title>
				<meta
					property='og:title'
					content='Detalhes do produto | GestorLy - Seu gestor de empresas online'
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
					<h2>Visualizar detalhes do produto</h2>
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
