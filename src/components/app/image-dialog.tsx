import { memo, useState, type ReactNode, type FC, type JSX } from 'react'

import { cn } from '@/lib/utils'
import {
	Carousel,
	CarouselItem,
	CarouselNext,
	CarouselContent,
	CarouselPrevious
} from '../ui/carousel'
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogDescription
} from '../ui/dialog'
import Image from 'next/image'

type IImageDialog = {
	images: string[]
	imageUrl: string
	children: ReactNode
}

const ImageDialog: FC<IImageDialog> = memo(
	({ images, imageUrl, children }): JSX.Element => {
		const [image, setImage] = useState<string>(imageUrl)

		return (
			<Dialog>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className='max-h-[90vh] !w-[90vw] max-w-7xl overflow-hidden border-transparent p-0'>
					<DialogHeader className='sr-only'>
						<DialogTitle>Visualizar Imagens</DialogTitle>
						<DialogDescription>Visualizar imagens do produto</DialogDescription>
					</DialogHeader>

					<div className='bg-card relative flex h-full min-h-80 w-full items-center justify-center overflow-hidden p-4'>
						<Image
							src={image}
							width={250}
							height={250}
							quality={100}
							alt='Imagem do produto'
							className='aspect-square h-full w-full object-contain'
						/>
					</div>

					<div className='flex items-center gap-2 p-4'>
						<Carousel className='w-full'>
							<CarouselContent>
								{images.map((img, index) => (
									<CarouselItem
										key={index}
										className='basis-1/2 md:basis-1/3 lg:basis-1/4'
									>
										<button
											key={index}
											onClick={() => setImage(img)}
											className={cn(
												'hover:bg-card rounded-md border p-2 transition-colors',
												image === img && 'border-primary'
											)}
										>
											<img
												src={img}
												alt={`Imagem ${index + 1}`}
												className='aspect-square h-24 w-24 cursor-pointer object-cover'
											/>
										</button>
									</CarouselItem>
								))}
							</CarouselContent>

							<CarouselPrevious className='left-4' />
							<CarouselNext className='right-4' />
						</Carousel>
					</div>
				</DialogContent>
			</Dialog>
		)
	}
)
ImageDialog.displayName = 'ImageDialog'

export { ImageDialog }
