import Head from 'next/head'
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
import type { JSX, ReactElement } from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { withSSRAuth } from '@/utils/with-ssr'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '@/components/pages/layout'
import { withCompany } from '@/utils/with-company'
import { columns, customers, DataTable } from '@/components/pages/customers'

const Customers: NextPageWithLayout = (): JSX.Element => {
	const isMobile = useIsMobile()

	return (
		<>
			<Head>
				<title>Clientes | GestorLy - Seu gestor de empresas online</title>
				<meta
					property='og:title'
					content='Clientes | GestorLy - Seu gestor de empresas online'
					key='title'
				/>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Clientes
						</h2>

						<Link href='customers/create' passHref>
							<Button
								variant='secondary'
								size={isMobile ? 'icon' : 'default'}
								className='cursor-pointer'
							>
								<span className={cn('hidden', !isMobile && 'inline-flex')}>
									Adicionar cliente
								</span>
								<Icon.plus />
							</Button>
						</Link>
					</div>

					<section className='w-full flex-1 overflow-x-auto rounded-md'>
						<DataTable columns={columns} data={customers} />
					</section>
				</main>
			</div>
		</>
	)
}
Customers.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Customers

export const getServerSideProps: GetServerSideProps = withSSRAuth(
	withCompany(async () => {
		return {
			props: {}
		}
	})
)
