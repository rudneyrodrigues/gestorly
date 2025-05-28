import { memo, type FC, type JSX } from 'react'

import type { Product } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/format'
import { Button } from '@/components/ui/button'
import { ButtonClipboard } from './button-clipboard'

type IInfoSection = {
	product: Product
}

const InfoSection: FC<IInfoSection> = memo(({ product }): JSX.Element => {
	return (
		<section className='bg-card hidden max-h-80 min-w-80 gap-6 rounded-md border p-4 xl:flex xl:flex-col'>
			<div className='flex flex-col gap-2'>
				<h2>Informações</h2>

				<div className='flex flex-col gap-2'>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						ID{' '}
						<ButtonClipboard
							id={product.id}
							className='text-muted-foreground'
						/>
					</p>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						Data de criação{' '}
						<strong className='text-muted-foreground text-xs'>
							{formatDateTime(product.createdAt)}
						</strong>
					</p>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						Data de modificação{' '}
						<strong className='text-muted-foreground text-xs'>
							{formatDateTime(product.updatedAt)}
						</strong>
					</p>
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<h2>Status</h2>

				<div className='flex flex-col gap-2'>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						Mostrar no catálogo{' '}
						<strong className='text-muted-foreground text-xs'>
							{product.showInCatalog ? (
								<Badge variant='default'>Sim</Badge>
							) : (
								<Badge variant='destructive'>Não</Badge>
							)}
						</strong>
					</p>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						Destacar no catálogo{' '}
						<strong className='text-muted-foreground text-xs'>
							{product.highlightInCatalog ? (
								<Badge variant='default'>Sim</Badge>
							) : (
								<Badge variant='destructive'>Não</Badge>
							)}
						</strong>
					</p>
				</div>
			</div>

			<div className='mt-auto'>
				<Button disabled rightIcon='arrowUpRight' className='w-full'>
					Visualizar produto
				</Button>
			</div>
		</section>
	)
})
InfoSection.displayName = 'InfoSection'

export default InfoSection
