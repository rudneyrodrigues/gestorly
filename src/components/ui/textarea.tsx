import * as React from 'react'
import { FieldError } from 'react-hook-form'

import { Label } from './label'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.ComponentProps<'textarea'> {
	name?: string
	label?: string
	error?: FieldError
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ name, label, className, error = null, ...props }, ref) => {
		return (
			<div className='flex w-full flex-col gap-2'>
				{!!label && <Label htmlFor={name}>{label}</Label>}

				<textarea
					id={name}
					ref={ref}
					name={name}
					data-slot='textarea'
					aria-invalid={!!error}
					className={cn(
						'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						className
					)}
					{...props}
				/>

				{!!error && (
					<span className='text-destructive text-xs' role='alert'>
						{error.message}
					</span>
				)}
			</div>
		)
	}
)

export { Textarea }
