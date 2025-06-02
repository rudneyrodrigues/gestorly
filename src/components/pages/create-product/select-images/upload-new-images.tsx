import { toast } from 'sonner'
import { parseCookies } from 'nookies'
import { ref, uploadBytes } from 'firebase/storage'
import {
	memo,
	type FC,
	type JSX,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'

import { cn } from '@/lib/utils'
import { storage } from '@/lib/firebase'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetImages } from '@/hooks/swr/use-get-images'

type IUploadNewImages = {
	setOption: Dispatch<SetStateAction<'upload' | 'storage'>>
}

const UploadNewImages: FC<IUploadNewImages> = memo(
	({ setOption }): JSX.Element => {
		const cookies = parseCookies()
		const { mutate } = useGetImages()
		const userUid = cookies['@user.uid']
		const [loading, setLoading] = useState(false)
		const [dragActive, setDragActive] = useState(false)
		const [previewImages, setPreviewImages] = useState<File[]>([])

		const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			event.stopPropagation()
			setDragActive(false)

			if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
				const filesArray = Array.from(event.dataTransfer.files)
				setPreviewImages(prev => [...prev, ...filesArray])
				event.dataTransfer.clearData()
			}
		}, [])

		const handleDragOver = useCallback(
			(event: React.DragEvent<HTMLDivElement>) => {
				event.preventDefault()
				event.stopPropagation()
				setDragActive(true)
			},
			[]
		)

		const handleDragLeave = useCallback(
			(event: React.DragEvent<HTMLDivElement>) => {
				event.preventDefault()
				event.stopPropagation()
				setDragActive(false)
			},
			[]
		)

		const handleFileChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				if (event.target.files) {
					const filesArray = Array.from(event.target.files)
					setPreviewImages(prev => [...prev, ...filesArray])
				}
			},
			[]
		)

		const handleImageUpload = useCallback(() => {
			setLoading(true)

			try {
				toast.promise(
					async () => {
						if (previewImages.length === 0) {
							throw new Error('Nenhuma imagem selecionada para upload.')
						}

						previewImages.map(async image => {
							const metadata = {
								contentType: image.type
							}

							const imageRef = ref(
								storage,
								`companies/${userUid}/${image.name}-${Date.now()}`
							)

							await uploadBytes(imageRef, image, metadata)
							await mutate()
							setPreviewImages([])
							setOption('storage')

							return
						})
					},
					{
						loading: 'Enviando imagens...',
						success: 'Imagens enviadas com sucesso!',
						error: error => error.message || 'Erro ao enviar imagens.'
					}
				)
			} catch (error) {
				console.error('Error uploading images:', error)
			} finally {
				setLoading(false)
			}
		}, [previewImages])

		return (
			<div className='flex flex-col gap-4'>
				<div
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					className={cn(
						'hover:bg-muted flex h-20 flex-col items-center justify-center overflow-hidden rounded-md border border-dashed transition-all',
						dragActive ? 'bg-muted/50' : ''
					)}
				>
					<label
						htmlFor='images'
						className='text-muted-foreground inline-flex w-full flex-1 cursor-pointer flex-col items-center justify-center gap-2 text-center text-sm opacity-50 transition-opacity hover:opacity-100'
					>
						Clique ou arraste imagens aqui para adicionar
					</label>

					<Input
						multiple
						id='images'
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleFileChange}
					/>
				</div>

				{previewImages.length > 0 && (
					<div className='grid max-h-40 grid-cols-2 gap-2 rounded-md sm:grid-cols-3 md:grid-cols-4'>
						{previewImages.map((image, index) => (
							<div
								key={index}
								className='bg-muted relative flex w-full items-center justify-center rounded-md border'
							>
								<img
									alt={`Preview ${index + 1}`}
									src={URL.createObjectURL(image)}
									className='h-full w-full rounded-md object-cover'
								/>
								<button
									type='button'
									className='bg-accent hover:bg-accent/80 absolute top-1 right-1 rounded-full p-1 transition-colors'
									onClick={() => {
										setPreviewImages(prevImages =>
											prevImages.filter((_, i) => i !== index)
										)
									}}
								>
									<Icon.x
										size={10}
										className='text-accent-foreground hover:text-destructive transition-colors'
									/>
								</button>
							</div>
						))}
					</div>
				)}

				<Button
					loading={loading}
					variant='secondary'
					rightIcon='floppyDisk'
					onClick={handleImageUpload}
					disabled={previewImages.length === 0}
				>
					Cadastrar imagens
				</Button>
			</div>
		)
	}
)
UploadNewImages.displayName = 'UploadNewImages'

export default UploadNewImages
