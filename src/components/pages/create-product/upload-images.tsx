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
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogContent,
	DialogTrigger,
	DialogDescription
} from '@/components/ui/dialog'

type IUploadImages = {
	images: File[]
	setImages: Dispatch<SetStateAction<File[]>>
}

const UploadImages: FC<IUploadImages> = memo(
	({ images, setImages }): JSX.Element => {
		const [open, setOpen] = useState(false)
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
			setImages(prevImages => [...prevImages, ...previewImages])
			setPreviewImages([])
			setOpen(false)
		}, [previewImages, setImages])

		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<div className='hover:bg-muted flex size-33.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-2'>
						<Icon.plus />
						<span className='text-muted-foreground text-xs'>
							Adicionar imagens
						</span>
					</div>
				</DialogTrigger>

				<DialogContent>
					<DialogHeader className='hidden'>
						<DialogTitle>Adicionar Imagens</DialogTitle>
						<DialogDescription>
							Arraste e solte suas imagens aqui ou clique para selecionar.
						</DialogDescription>
					</DialogHeader>

					<div
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						className={cn(
							'flex h-80 flex-col items-center justify-center overflow-hidden rounded-md border border-dashed',
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
							accept='image/png, image/jpeg, image/jpg'
							className='hidden'
							onChange={handleFileChange}
						/>
					</div>

					<div className='flex w-full flex-wrap gap-2'>
						{previewImages.map((image, index) => (
							<div
								key={index}
								className='bg-muted relative flex size-22.5 items-center justify-center rounded-md border'
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

					<DialogFooter>
						<Button
							rightIcon='image'
							onClick={handleImageUpload}
							disabled={previewImages.length <= 0}
						>
							Adicionar imagens
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
)
UploadImages.displayName = 'UploadImages'

export { UploadImages }
