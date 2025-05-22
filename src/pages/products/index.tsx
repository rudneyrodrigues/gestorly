import Head from 'next/head'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { withSSRAuth } from '@/utils/with-ssr'
import { Button } from '@/components/ui/button'
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
					<div className='my-6 flex items-center justify-between gap-2 rounded-md border p-4'>
						<h2>Produtos</h2>

						<Button size='sm' variant='secondary' rightIcon='plus'>
							Adicionar produto
						</Button>
					</div>
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
