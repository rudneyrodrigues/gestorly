import { memo, type FC, type JSX, type ReactNode } from 'react'

import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogDescription
} from '../ui/dialog'

type IImageDialog = {
	imageUrl: string
	children: ReactNode
}

const ImageDialog: FC<IImageDialog> = memo(
	({ imageUrl, children }): JSX.Element => {
		return (
			<Dialog>
				<DialogTrigger className='focus-visible:border-ring focus-visible:ring-ring/50 flex overflow-hidden rounded-md outline-none focus-visible:ring-[3px]'>
					{children}
				</DialogTrigger>

				<DialogContent className='max-h-[90vh] min-h-40 !w-[90vw] max-w-7xl overflow-hidden border p-0'>
					<DialogHeader className='sr-only'>
						<DialogTitle>Visualizar Imagens</DialogTitle>
						<DialogDescription>Visualizar imagens do produto</DialogDescription>
					</DialogHeader>

					<img
						src={imageUrl}
						alt='Imagem do produto'
						className='h-full w-full object-cover object-center transition-transform duration-200 ease-in-out hover:scale-105'
					/>
				</DialogContent>
			</Dialog>
		)
	}
)
ImageDialog.displayName = 'ImageDialog'

export { ImageDialog }
