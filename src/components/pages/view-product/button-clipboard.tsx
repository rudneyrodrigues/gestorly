import { toast } from 'sonner'
import { memo, type FC, type JSX, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider
} from '@/components/ui/tooltip'

type IButtonClipboard = {
	id: string
} & ComponentProps<typeof Button>

const ButtonClipboard: FC<IButtonClipboard> = memo(
	({ id, className, ...props }): JSX.Element => {
		const copyToClipboard = (text: string) => {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toast.success('ID copiado para a área de transferência!')
				})
				.catch(err => {
					toast.error('Erro ao copiar o texto: ' + err.message)
				})
		}

		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size='sm'
							variant='outline'
							aria-label='Copiar ID do produto'
							onClick={() => copyToClipboard(id)}
							className={cn('h-6 cursor-pointer text-xs', className)}
							{...props}
						>
							{id}
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom'>Copiar ID do produto</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
)
ButtonClipboard.displayName = 'ButtonClipboard'

export { ButtonClipboard }
