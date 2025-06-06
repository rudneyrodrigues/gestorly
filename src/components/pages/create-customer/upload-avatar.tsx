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

type IUploadAvatar = {
	setAvatar: Dispatch<SetStateAction<File | undefined>>
}

const UploadAvatar: FC<IUploadAvatar> = memo(({ setAvatar }): JSX.Element => {
	const [previewAvatar, setPreviewAvatar] = useState<File>()
	const [dragActive, setDragActive] = useState(false)

	const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.stopPropagation()
		setDragActive(false)

		if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
			const filesArray = Array.from(event.dataTransfer.files)
			setPreviewAvatar(filesArray[0])
			setAvatar(filesArray[0])
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
			const files = event.target.files
			if (files && files.length > 0) {
				const fileArray = Array.from(files)
				setPreviewAvatar(fileArray[0])
				setAvatar(fileArray[0])
				event.target.value = '' // Clear the input after selection
			}
		},
		[]
	)

	const handleExcludeFile = () => {
		setPreviewAvatar(undefined)
		setAvatar(undefined)
	}

	return (
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={cn(
				'hover:bg-muted relative flex flex-1 flex-col items-center justify-center overflow-hidden transition-colors',
				dragActive ? 'bg-muted' : 'bg-transparent'
			)}
		>
			<label
				htmlFor='images'
				className={cn(
					'text-muted-foreground inline-flex w-full flex-1 cursor-pointer flex-col items-center justify-center gap-2 text-center text-sm',
					previewAvatar
						? 'absolute z-30 h-full w-full items-center justify-center opacity-0'
						: 'opacity-50 transition-opacity hover:opacity-100'
				)}
			>
				{previewAvatar ? 'Alterar imagem' : 'Clique ou arraste uma imagem aqui'}
			</label>

			<Input
				id='images'
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleFileChange}
			/>

			{previewAvatar && (
				<div className='relative mx-auto flex flex-1'>
					<img
						alt='Preview Avatar'
						src={URL.createObjectURL(previewAvatar)}
						className='h-full w-full rounded-md object-cover opacity-75 transition-opacity hover:opacity-100'
					/>

					<button
						type='button'
						onClick={handleExcludeFile}
						className='group bg-muted absolute top-1 right-1 z-40 rounded-full p-1'
					>
						<Icon.x size={10} className='group-hover:text-destructive' />
					</button>
				</div>
			)}
		</div>
	)
})
UploadAvatar.displayName = 'UploadAvatar'

export default UploadAvatar
