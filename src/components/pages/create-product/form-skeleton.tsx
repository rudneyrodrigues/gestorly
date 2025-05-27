import { type ComponentProps, memo, type FC, type JSX } from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type IFormCreateProductSkeleton = {} & ComponentProps<'div'>

const FormCreateProductSkeleton: FC<IFormCreateProductSkeleton> = memo(
	({ className, ...props }: IFormCreateProductSkeleton): JSX.Element => {
		return (
			<div className={cn('flex flex-col gap-6', className)} {...props}>
				<div className='flex flex-col gap-4'>
					<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-10 w-full' />
					</div>

					<div className='flex w-full flex-col gap-4'>
						<Skeleton className='h-40 w-full' />
					</div>

					<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-10 w-full' />
					</div>

					<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-10 w-full' />
					</div>

					<div className='flex flex-wrap items-center justify-center gap-2 md:justify-start'>
						{Array.from({ length: 7 }).map((_, index) => (
							<Skeleton key={index} className='size-35.5' />
						))}
					</div>
				</div>

				<Skeleton className='h-10 w-full sm:ml-auto sm:max-w-40' />
			</div>
		)
	}
)
FormCreateProductSkeleton.displayName = 'FormCreateProductSkeleton'

export { FormCreateProductSkeleton }
