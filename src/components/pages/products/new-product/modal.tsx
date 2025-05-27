import {
	memo,
	lazy,
	type FC,
	type JSX,
	Suspense,
	useState,
	type ReactNode
} from 'react'

import { Icon } from '@/components/ui/icon'
import { useIsMobile } from '@/hooks/use-mobile'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogDescription
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerTitle,
	DrawerHeader,
	DrawerTrigger,
	DrawerContent,
	DrawerDescription
} from '@/components/ui/drawer'

const FormNewProduct = lazy(() => import('./form'))

type IModalNewProduct = {
	children: ReactNode
}

const ModalNewProduct: FC<IModalNewProduct> = memo(
	({ children }): JSX.Element => {
		// const isMobile = useIsMobile()
		const [isOpen, setIsOpen] = useState(false)

		// if (isMobile) {
		// 	return (
		// 		<Drawer open={isOpen} onOpenChange={setIsOpen}>
		// 			<DrawerTrigger asChild>{children}</DrawerTrigger>

		// 			<DrawerContent>
		// 				<DrawerHeader>
		// 					<DrawerTitle>Adicionar produto</DrawerTitle>
		// 					<DrawerDescription>
		// 						Preencha os campos abaixo para adicionar um novo produto.
		// 					</DrawerDescription>
		// 				</DrawerHeader>

		// 				<Separator />

		// 				<ScrollArea className='overflow-auto'>
		// 					<Suspense
		// 						fallback={
		// 							<div className='flex h-full w-full items-center justify-center'>
		// 								<Icon.loading className='animate-spin' />
		// 							</div>
		// 						}
		// 					>
		// 						<FormNewProduct setIsOpenModal={setIsOpen} className='p-4' />
		// 					</Suspense>
		// 				</ScrollArea>
		// 			</DrawerContent>
		// 		</Drawer>
		// 	)
		// }

		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className='sm:max-w-2xl'>
					<DialogHeader>
						<DialogTitle>Adicionar produto</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para adicionar um novo produto.
						</DialogDescription>
					</DialogHeader>

					<Suspense
						fallback={
							<div className='flex h-full w-full items-center justify-center'>
								<Icon.loading className='animate-spin' />
							</div>
						}
					>
						<FormNewProduct setIsOpenModal={setIsOpen} />
					</Suspense>
				</DialogContent>
			</Dialog>
		)
	}
)
ModalNewProduct.displayName = 'ModalNewProduct'

export { ModalNewProduct }
