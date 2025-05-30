import { memo, type FC, type JSX } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const FormSkeleton: FC = memo((): JSX.Element => {
	return (
		<div className='flex w-full flex-col gap-6'>
			<div className='flex flex-col gap-4'>
				<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
				</div>

				<div className='flex w-full flex-col gap-4'>
					<Skeleton className='h-20 w-full' />
				</div>

				<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
				</div>

				<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
				</div>
			</div>

			<Skeleton className='h-10 w-full sm:ml-auto sm:w-40' />
		</div>
	)
})
FormSkeleton.displayName = 'FormSkeleton'

export { FormSkeleton }
