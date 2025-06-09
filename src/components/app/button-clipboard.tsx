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
	copy: string
	name?: string
	showTooltip?: boolean
	tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
} & ComponentProps<typeof Button>

const ButtonClipboard: FC<IButtonClipboard> = memo(
	({
		copy,
		name,
		showTooltip = true,
		tooltipPosition = 'bottom',
		className,
		...props
	}): JSX.Element => {
		const copyToClipboard = (text: string) => {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toast.success(
						name ? `${name} copiado com sucesso!` : 'Copiado com sucesso!'
					)
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
							rightIcon='clipboardText'
							aria-label={name ? `Copiar ${name}` : 'Copiar'}
							onClick={() => copyToClipboard(copy)}
							className={cn(
								'text-muted-foreground h-6 cursor-pointer text-xs',
								className
							)}
							{...props}
						>
							{copy}
						</Button>
					</TooltipTrigger>
					{showTooltip && (
						<TooltipContent side={tooltipPosition}>
							{name ? `Copiar ${name}` : 'Copiar'}
						</TooltipContent>
					)}
				</Tooltip>
			</TooltipProvider>
		)
	}
)
ButtonClipboard.displayName = 'ButtonClipboard'

export { ButtonClipboard }
