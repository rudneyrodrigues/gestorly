import Head from 'next/head'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { withSSRAuth } from '@/utils/with-ssr'
import type { NextPageWithLayout } from '@/types'
import { withCompany } from '@/utils/with-company'
import { Layout } from '@/components/pages/layout'

const Home: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='flex flex-1 flex-col items-center justify-center'>
					<h2>Olá mundo</h2>
				</main>
			</div>
		</>
	)
}
Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Home

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
