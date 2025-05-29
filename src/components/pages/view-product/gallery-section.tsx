import Image from 'next/image'
import { memo, type FC, type JSX } from 'react'

import { Icon } from '@/components/ui/icon'
import { ImageDialog } from '@/components/app'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider
} from '@/components/ui/tooltip'

type IGallerySection = {
	images: string[]
}

const GallerySection: FC<IGallerySection> = memo(({ images }): JSX.Element => {
	return (
		<section className='bg-card flex min-w-80 flex-col gap-6 rounded-md border p-4'>
			<div className='flex flex-col gap-2'>
				<div className='flex items-center justify-between gap-2 border-b pb-2'>
					<h2 className='scroll-m-20 text-xl font-semibold tracking-tight'>
						Galeria de imagens
					</h2>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button size='icon' variant='ghost'>
									<Icon.plus />
								</Button>
							</TooltipTrigger>

							<TooltipContent side='bottom'>Adicionar imagens</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className='relative grid grid-cols-2 gap-4'>
					{/* Exibir apenas as quatro primeiras imagens */}
					{images.length === 0 ? (
						<span className='text-muted-foreground col-span-full text-sm'>
							Nenhuma imagem disponível
						</span>
					) : (
						images.slice(0, 4).map((image, index) => (
							<ImageDialog imageUrl={image} images={images} key={index}>
								<div className='hover:bg-muted rounded-md border p-2 transition-colors'>
									<Image
										src={image}
										width={160}
										height={160}
										quality={80}
										alt={`Imagem ${index + 1}`}
										className='block aspect-square w-full'
									/>
								</div>
							</ImageDialog>
						))
					)}
				</div>
			</div>

			<ImageDialog imageUrl={images[0]} images={images}>
				<Button
					disabled={images.length === 0}
					rightIcon='image'
					variant='outline'
					className='w-full'
				>
					Ver galeria completa
				</Button>
			</ImageDialog>
		</section>
	)
})
GallerySection.displayName = 'GallerySection'

export default GallerySection
