import {
	memo,
	type FC,
	type JSX,
	type Dispatch,
	type SetStateAction
} from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetImages } from '@/hooks/swr/use-get-images'

type IStorageImages = {
	previewImages: string[]
	setPreviewImages: Dispatch<SetStateAction<string[]>>
}

const StorageImages: FC<IStorageImages> = memo(
	({ previewImages, setPreviewImages }): JSX.Element => {
		const { error, images, loading } = useGetImages()

		if (loading) {
			return (
				<div className='flex max-h-80 min-h-20 animate-pulse flex-col items-center justify-center rounded-md border border-dashed'>
					<Icon.loading className='animate-spin' />
				</div>
			)
		}

		if (error || !images) {
			return (
				<div className='max-h-80 min-h-20 rounded-md border border-dashed'>
					<strong>Erro ao carregar images do servidor</strong>
				</div>
			)
		}

		return (
			<ScrollArea classNameViewport='max-h-80 min-h-20'>
				<div className='grid max-h-80 grid-cols-2 gap-2 rounded-md border border-dashed p-2 sm:grid-cols-3 md:grid-cols-4'>
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => {
								if (previewImages.includes(image)) {
									setPreviewImages(previewImages.filter(img => img !== image))
								} else {
									setPreviewImages([...previewImages, image])
								}
							}}
							className={cn(
								'bg-muted focus-visible:border-ring focus-visible:ring-ring/50 relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border outline-none focus-visible:ring-[3px]',
								previewImages.includes(image) && 'border-primary'
							)}
						>
							<img
								alt={image}
								src={image}
								className='h-full w-full object-cover'
							/>

							<div
								className={cn(
									'bg-muted absolute top-1 right-1 hidden rounded-xs border',
									previewImages.includes(image) && 'block'
								)}
							>
								<Icon.check className='text-primary' />
							</div>
						</button>
					))}
				</div>
			</ScrollArea>
		)
	}
)
StorageImages.displayName = 'StorageImages'

export default StorageImages
