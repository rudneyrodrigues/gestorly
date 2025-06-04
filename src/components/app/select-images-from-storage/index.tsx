import {
	memo,
	lazy,
	type FC,
	type JSX,
	Suspense,
	useState,
	useEffect,
	type Dispatch,
	type ReactNode,
	type SetStateAction
} from 'react'

import { Icon } from '@/components/ui/icon'
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

const StorageImages = lazy(() => import('./storage-images'))
const UploadNewImages = lazy(() => import('./upload-new-images'))

type IUploadImages = {
	children: ReactNode
	selectedImages: string[]
	setSelectedImages: Dispatch<SetStateAction<string[]>>
}

const UploadImages: FC<IUploadImages> = memo(
	({ children, selectedImages, setSelectedImages }): JSX.Element => {
		const [open, setOpen] = useState(false)
		const [previewImages, setPreviewImages] = useState<string[]>(selectedImages)
		const [option, setOption] = useState<'upload' | 'storage'>('storage')

		useEffect(() => {
			if (open) {
				setPreviewImages(selectedImages)
			}
		}, [open, selectedImages])

		return (
			<Dialog
				open={open}
				onOpenChange={() => {
					setOpen(!open)
					setOption('storage')
				}}
			>
				<DialogTrigger className='focus-visible:border-ring focus-visible:ring-ring/50 overflow-hidden rounded-md outline-none focus-visible:ring-[3px]'>
					{children}
				</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{option === 'storage'
								? 'Selecionar imagens do armazenamento'
								: 'Enviar novas imagens'}
						</DialogTitle>
						<DialogDescription>
							{option === 'storage'
								? 'Selecione as imagens que deseja usar do armazenamento.'
								: 'Envie novas imagens para o armazenamento.'}
						</DialogDescription>
					</DialogHeader>

					{option === 'storage' ? (
						<Suspense
							fallback={
								<div className='flex h-20 flex-col flex-wrap items-center justify-center gap-2 rounded-md border border-dashed p-2'>
									<Icon.loading className='animate-spin' />
								</div>
							}
						>
							<StorageImages
								previewImages={previewImages}
								setPreviewImages={setPreviewImages}
							/>
						</Suspense>
					) : (
						<Suspense
							fallback={
								<div className='flex h-20 flex-col flex-wrap items-center justify-center gap-2 rounded-md border border-dashed p-2'>
									<Icon.loading className='animate-spin' />
								</div>
							}
						>
							<UploadNewImages setOption={setOption} />
						</Suspense>
					)}

					<DialogFooter>
						<div className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
							<Button
								variant='outline'
								onClick={() =>
									setOption(option === 'storage' ? 'upload' : 'storage')
								}
								className='mr-auto w-full sm:w-auto'
							>
								{option === 'upload' && <Icon.caretLeft />}

								{option === 'storage'
									? 'Enviar novas imagens'
									: 'Voltar para armazenamento'}
							</Button>

							{option === 'storage' && (
								<Button
									rightIcon='image'
									disabled={previewImages.length === 0}
									onClick={() => {
										setSelectedImages(previewImages)
										setPreviewImages([])
										setOpen(false)
									}}
									className='w-full sm:w-auto'
								>
									Selecionar imagens
								</Button>
							)}
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
)
UploadImages.displayName = 'UploadImages'

export { UploadImages }
