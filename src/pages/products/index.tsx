import Head from 'next/head'
import type { JSX, ReactElement } from 'react'
import type { GetServerSideProps } from 'next'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { withSSRAuth } from '@/utils/with-ssr'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import type { NextPageWithLayout } from '@/types'
import { withCompany } from '@/utils/with-company'
import { Layout } from '@/components/pages/layout'
import { columns, DataTable, payments } from '@/components/pages/products'

const Product: NextPageWithLayout = (): JSX.Element => {
	const isMobile = useIsMobile()

	return (
		<>
			<Head>
				<title>Produtos | GestorLy - Seu gestor de empresas online</title>
			</Head>

			<div className='flex flex-1 flex-col'>
				<main className='container mx-auto flex flex-1 flex-col gap-6 px-3 py-6'>
					<div className='flex items-center justify-between gap-2 rounded-md'>
						<h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
							Produtos
						</h2>

						<Button size={isMobile ? 'icon' : 'default'} variant='secondary'>
							<span className={cn('hidden', !isMobile && 'inline-flex')}>
								Adicionar produto
							</span>
							<Icon.plus />
						</Button>
					</div>

					<section className='w-full flex-1 rounded-md'>
						<DataTable columns={columns} data={payments} />
					</section>
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
