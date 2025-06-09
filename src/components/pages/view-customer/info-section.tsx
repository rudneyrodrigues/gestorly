import { memo, type FC, type JSX } from 'react'

import { Customer } from '@/types'
import { formatPhone } from '@/utils/format/phone'
import { Button } from '@/components/ui/button'
import { ButtonClipboard } from '@/components/app/button-clipboard'

type IInfoSection = {
	customer: Customer
}

const InfoSection: FC<IInfoSection> = memo(({ customer }): JSX.Element => {
	return (
		<section className='bg-card sticky top-18 flex w-full flex-col gap-6 rounded-md border p-4'>
			<div className='flex flex-col gap-2'>
				<h2 className='scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight'>
					Informações
				</h2>

				<div className='flex flex-col gap-2'>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						ID{' '}
						<ButtonClipboard name='ID' copy={customer.id} showTooltip={false} />
					</p>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						Nome{' '}
						<ButtonClipboard
							name='Nome'
							showTooltip={false}
							copy={customer.name}
						/>
					</p>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						E-mail{' '}
						<ButtonClipboard
							name='E-mail'
							showTooltip={false}
							copy={customer.email}
						/>
					</p>
					<p className='text-foreground flex items-center justify-between gap-1 text-sm'>
						Telefone{' '}
						<ButtonClipboard
							name='Telefone'
							showTooltip={false}
							copy={formatPhone(customer.phone)}
						/>
					</p>
				</div>
			</div>

			<div className='mt-auto'>
				<Button variant='outline' className='w-full'>
					Editar cliente
				</Button>
			</div>
		</section>
	)
})
InfoSection.displayName = 'InfoSection'

export default InfoSection
