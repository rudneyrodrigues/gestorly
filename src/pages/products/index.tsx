import Head from 'next/head'
import { parseCookies } from 'nookies'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import type { Company } from '@/types'
import { Header } from '@/components/app'
import { NextPageWithLayout } from '../_app'
import { withSSRAuth } from '@/utils/with-ssr'
import { firestore } from '@/lib/firebase-admin'
import { AppSidebar } from '@/components/app/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

const Product: NextPageWithLayout = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>Produtos | GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='flex flex-1 flex-col items-center justify-center'>
					<h2>Página de produtos</h2>
				</main>
			</div>
		</>
	)
}
Product.getLayout = function getLayout(page: ReactElement) {
	return (
		<SidebarProvider>
			<AppSidebar />

			<SidebarInset>
				<Header />

				{page}
			</SidebarInset>
		</SidebarProvider>
	)
}

export default Product

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
	const cookies = parseCookies(ctx)
	const userUid = cookies['@user.uid']

	const doc = await firestore.collection('companies').doc(userUid).get()

	if (!doc.exists) {
		return {
			redirect: {
				destination: '/setup',
				permanent: false
			}
		}
	}

	const company = doc.data() as Company

	return {
		props: {
			company
		}
	}
})
