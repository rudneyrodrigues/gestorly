import Image from 'next/image'
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
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className='max-h-[90vh] !w-[90vw] max-w-7xl overflow-hidden border-transparent p-0'>
					<DialogHeader className='sr-only'>
						<DialogTitle>Visualizar Imagens</DialogTitle>
						<DialogDescription>Visualizar imagens do produto</DialogDescription>
					</DialogHeader>

					<Image
						width={250}
						height={250}
						quality={100}
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
