import Head from 'next/head'
import type { JSX } from 'react'
import { parseCookies } from 'nookies'
import type { GetServerSideProps, NextPage } from 'next'

import { withSSRAuth } from '@/utils/with-ssr'
import { firestore } from '@/lib/firebase-admin'
import { Header, FormNewCompany } from '@/components/pages/setup'

const Setup: NextPage = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex min-h-svh flex-col'>
				<Header />

				<main className='flex flex-1 flex-col items-center gap-6 py-6'>
					<div className='mx-auto w-full max-w-xl space-y-6'>
						<h2 className='scroll-m-20 border-b pb-2 text-center text-3xl font-semibold tracking-tight first:mt-0'>
							Criar uma nova empresa
						</h2>

						<FormNewCompany />
					</div>
				</main>
			</div>
		</>
	)
}

export default Setup

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ctx => {
	const cookies = parseCookies(ctx)
	const userUid = cookies['@user.uid']

	const doc = await firestore.collection('companies').doc(userUid).get()

	if (doc.exists) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
})
