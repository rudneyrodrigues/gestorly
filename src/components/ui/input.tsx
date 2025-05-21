import * as React from 'react'
import { FieldError } from 'react-hook-form'

import { Label } from './label'
import { cn } from '@/lib/utils'
import { Icon, IconType } from './icon'

interface InputProps extends React.ComponentProps<'input'> {
	name?: string
	label?: string
	icon?: IconType
	prefix?: string
	error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, type, name, icon, prefix, label, error = null, ...props },
		ref
	): React.JSX.Element => {
		const IconComp = icon && Icon[icon]

		return (
			<div className='flex w-full flex-col gap-2'>
				{!!label && <Label htmlFor={name}>{label}</Label>}

				<div
					className={cn(
						'dark:bg-input/30 border-input relative flex h-10 w-full items-center overflow-hidden rounded-md border bg-transparent p-0 text-white shadow-sm outline-none',
						'has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]',
						'has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive',
						className
					)}
				>
					{prefix ? (
						<div className='bg-muted/40 flex h-full items-center justify-center rounded-l-md pr-1 pl-3'>
							<label
								htmlFor={name}
								className='text-muted-foreground text-base font-medium'
							>
								{prefix}
							</label>
						</div>
					) : (
						IconComp && (
							<label
								htmlFor={name}
								className='text-muted-foreground flex h-full items-center justify-center p-3'
							>
								<IconComp size={18} />
							</label>
						)
					)}

					<input
						id={name}
						ref={ref}
						type={type}
						name={name}
						data-slot='input'
						aria-invalid={!!error}
						className={cn(
							'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-full w-full min-w-0 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
							icon && 'pl-0',
							prefix && 'pl-1',
							className
						)}
						{...props}
					/>
				</div>

				{!!error && (
					<span className='text-destructive text-xs' role='alert'>
						{error.message}
					</span>
				)}
			</div>
		)
	}
)

export { Input }
