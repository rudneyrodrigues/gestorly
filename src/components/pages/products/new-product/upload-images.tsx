import {
	memo,
	type FC,
	type JSX,
	type Dispatch,
	type SetStateAction
} from 'react'

import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

type IUploadImages = {
	images: File[]
	setImages: Dispatch<SetStateAction<File[]>>
}

const UploadImages: FC<IUploadImages> = memo(
	({ images, setImages }): JSX.Element => {
		return (
			<div className='flex flex-wrap gap-2'>
				<div className='flex size-22.5 flex-col items-center justify-center rounded-md border border-dashed md:size-36'>
					<label
						htmlFor='images'
						className='text-muted-foreground inline-flex w-full flex-1 cursor-pointer flex-col items-center justify-center gap-2 text-center text-sm'
					>
						<Icon.plus />
						Adicionar
					</label>
					<Input
						multiple
						id='images'
						type='file'
						accept='image/png, image/jpeg, image/jpg'
						className='hidden'
						onChange={e => {
							if (e.target.files) {
								const filesArray = Array.from(e.target.files)
								setImages(prevImages => [...prevImages, ...filesArray])
							}
						}}
					/>
				</div>

				{images.map((image, index) => (
					<div
						key={index}
						className='bg-muted relative flex size-22.5 items-center justify-center rounded-md border md:size-36'
					>
						<img
							src={URL.createObjectURL(image)}
							alt={`Preview ${index + 1}`}
							className='h-full w-full rounded-md object-cover'
						/>
						<button
							type='button'
							className='bg-accent hover:bg-accent/80 absolute top-1 right-1 rounded-full p-1 transition-colors'
							onClick={() => {
								setImages(prevImages =>
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
		)
	}
)
UploadImages.displayName = 'UploadImages'

export { UploadImages }
