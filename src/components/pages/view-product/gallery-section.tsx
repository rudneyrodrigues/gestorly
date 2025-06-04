import Image from 'next/image'
import { toast } from 'sonner'
import { memo, useEffect, useState, type FC, type JSX } from 'react'

import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageDialog, UploadImages } from '@/components/app'
import { useGetProductById } from '@/hooks/swr/use-get-product-by-id'

type IGallerySection = {
	id: string
	images: string[]
}

const GallerySection: FC<IGallerySection> = memo(
	({ id, images }): JSX.Element => {
		const { mutate } = useGetProductById(id)
		const [loading, setLoading] = useState<boolean>(false)
		const [uploadImages, setUploadImages] = useState<string[]>(images)

		const arraysAreEqual = (a: string[], b: string[]) =>
			a.length === b.length && a.every((img, index) => img === b[index])

		const handleUpdateImages = () => {
			setLoading(true)

			if (uploadImages.length === 0) {
				toast.error('Você deve adicionar ao menos uma imagem ao produto.')
			}

			if (
				uploadImages.length === images.length &&
				arraysAreEqual(uploadImages, images)
			) {
				toast.error('Nenhuma imagem foi alterada.')
				return
			}

			try {
				toast.promise(
					api.put(`/products/${id}/update/images`, {
						images: uploadImages
					}),
					{
						loading: 'Atualizando imagens do produto...',
						success: () => {
							mutate()
							return 'Imagens do produto atualizadas com sucesso!'
						},
						error: err => {
							console.error(err)
							return 'Erro ao atualizar imagens do produto.'
						},
						finally: () => {
							setLoading(false)
						}
					}
				)
			} catch (error) {
				console.error('Error updating images:', error)
				toast.error('Erro ao atualizar imagens do produto.')
				return
			}
		}

		useEffect(() => {
			if (images.length > 0) {
				setUploadImages(images)
			}
		}, [images])

		return (
			<section className='flex flex-col gap-6'>
				<div className='grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
					<UploadImages
						selectedImages={uploadImages}
						setSelectedImages={setUploadImages}
					>
						<div
							className={cn(
								'hover:bg-muted flex h-full min-h-[156px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-2 transition-all duration-200',
								loading && 'cursor-not-allowed opacity-50'
							)}
						>
							<Icon.plus />
							<span className='text-muted-foreground text-center text-xs'>
								Adicionar imagens
							</span>
						</div>
					</UploadImages>

					{uploadImages.length === 0 ? (
						<div className='relative flex items-center justify-center overflow-hidden rounded-md p-4'>
							<span className='text-muted-foreground col-span-full text-center text-sm'>
								Nenhuma imagem disponível
							</span>
						</div>
					) : (
						uploadImages
							// .slice(0, 4)
							.map((image, index) => (
								<div
									key={index}
									className='relative flex flex-1 cursor-pointer'
								>
									<ImageDialog imageUrl={image}>
										<Image
											src={image}
											width={160}
											height={160}
											quality={100}
											alt={`Imagem ${index + 1}`}
											className='block aspect-square w-full opacity-80 transition-all duration-200 hover:opacity-100'
										/>
									</ImageDialog>
									<button
										onClick={() => {
											setUploadImages(prev =>
												prev.filter((_, i) => i !== index)
											)
										}}
										className='group bg-accent hover:bg-accent/80 focus-visible:border-ring focus-visible:ring-ring/50 absolute top-1 right-1 rounded-full p-1 transition-colors outline-none focus-visible:ring-[3px]'
									>
										<Icon.x
											size={10}
											className='text-accent-foreground group-hover:text-destructive transition-colors'
										/>
									</button>
								</div>
							))
					)}
				</div>

				<div className='flex w-full items-center justify-end gap-3'>
					<Button
						loading={loading}
						onClick={handleUpdateImages}
						disabled={
							uploadImages.length === 0 || arraysAreEqual(uploadImages, images)
						}
						className='w-full sm:w-auto'
					>
						Atualizar imagens
					</Button>
				</div>
			</section>
		)
	}
)
GallerySection.displayName = 'GallerySection'

export default GallerySection

const GallerySectionSkeleton: FC = memo((): JSX.Element => {
	return (
		<section className='grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
			<Skeleton className='h-full min-h-[156px] w-full' />

			{Array.from({ length: 4 }).map((_, index) => (
				<div key={index}>
					<Skeleton className='block aspect-square w-full' />
				</div>
			))}
		</section>
	)
})
GallerySectionSkeleton.displayName = 'GallerySectionSkeleton'

export { GallerySectionSkeleton }
