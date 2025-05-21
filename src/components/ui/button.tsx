import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Icon, type IconType } from './icon'

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		loading?: boolean
		leftIcon?: IconType
		rightIcon?: IconType
		loadingText?: string
	}

const Button = React.memo(
	React.forwardRef<HTMLButtonElement, ButtonProps>(
		(
			{
				size,
				variant,
				leftIcon,
				rightIcon,
				className,
				loadingText,
				loading = false,
				asChild = false,
				...props
			},
			ref
		) => {
			const Comp = asChild ? Slot : 'button'
			const LeftIcon = leftIcon && Icon[leftIcon]
			const RightIcon = rightIcon && Icon[rightIcon]

			return (
				<Comp
					ref={ref}
					data-slot='button'
					disabled={loading || props.disabled}
					aria-disabled={loading || props.disabled}
					className={cn(buttonVariants({ variant, size, className }))}
					{...props}
				>
					<>
						{!loading && LeftIcon && <LeftIcon size={24} />}

						{loading ? (
							<div className='flex items-center justify-center gap-2'>
								<Icon.loading
									weight='bold'
									size={size === 'lg' ? 24 : 20}
									className='animate-spin'
								/>

								{loading && size === 'icon'
									? null
									: loadingText
										? loadingText
										: props.children}
							</div>
						) : (
							props.children
						)}

						{!loading && RightIcon && <RightIcon />}
					</>
				</Comp>
			)
		}
	)
)
Button.displayName = 'Button'

export { Button, buttonVariants }
