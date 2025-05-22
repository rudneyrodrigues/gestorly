import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('tracking-tight scroll-m-20', {
	variants: {
		variant: {
			default: 'text-default',
			muted: 'text-muted',
			accent: 'text-accent',
			destructive: 'text-destructive'
		},
		size: {
			default: 'text-base',
			sm: 'text-sm',
			lg: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl',
			'3xl': 'text-3xl',
			'4xl': 'text-4xl',
			'5xl': 'text-5xl',
			'6xl': 'text-6xl'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
})

type TextProps = {} & React.ComponentPropsWithoutRef<'p'> &
	VariantProps<typeof textVariants> & {
		as?: React.ElementType
	}

const Text = React.forwardRef<HTMLElement, TextProps>(
	({ as, className, variant, size, ...props }, ref) => {
		const Component = as || 'p'

		return (
			<Component
				className={cn(textVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Text.displayName = 'Text'

export { Text, textVariants }
