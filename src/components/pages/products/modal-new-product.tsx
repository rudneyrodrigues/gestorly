import {
	memo,
	type FC,
	type JSX,
	useState,
	type ReactNode,
	type FormEvent
} from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Select,
	SelectItem,
	SelectValue,
	SelectTrigger,
	SelectContent
} from '@/components/ui/select'
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

type IModalNewProduct = {
	children: ReactNode
}

const ModalNewProduct: FC<IModalNewProduct> = memo(
	({ children }): JSX.Element => {
		const isMobile = useIsMobile()
		const [isOpen, setIsOpen] = useState(false)

		const onSubmit = (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			// Handle form submission logic here
			console.log('Form submitted')
		}

		if (isMobile) {
			return (
				<Drawer open={isOpen} onOpenChange={setIsOpen}>
					<DrawerTrigger asChild>{children}</DrawerTrigger>

					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Adicionar produto</DrawerTitle>
							<DrawerDescription>
								Preencha os campos abaixo para adicionar um novo produto.
							</DrawerDescription>
						</DrawerHeader>

						<Separator />

						<ScrollArea className='h-svh overflow-auto'>
							<form onSubmit={onSubmit} className='flex flex-col gap-4 p-4'>
								<div className='flex w-full flex-col gap-2'>
									<Input
										type='text'
										label='Nome do produto'
										placeholder='Nome do produto'
									/>
									<Textarea
										rows={5}
										label='Descrição do produto'
										placeholder='Descrição do produto'
										className='max-h-40 resize-none'
									/>
								</div>

								<div>
									<Button type='button' variant='outline' className='w-full'>
										Categoria
									</Button>
								</div>

								<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
									<div className='flex flex-col gap-2'>
										<Label>Mostrar no catálogo</Label>

										<Select defaultValue='yes'>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Mostrar no catálogo' />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value='yes'>Sim</SelectItem>
												<SelectItem value='no'>Não</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='flex flex-col gap-2'>
										<Label>Destacar no catálogo</Label>

										<Select defaultValue='no'>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Destacar no catálogo' />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value='yes'>Sim</SelectItem>
												<SelectItem value='no'>Não</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
									<Input type='text' label='Estoque' placeholder='10' />
									<Input type='text' label='Preço' placeholder='R$ 10,00' />
								</div>

								<Button type='submit' disabled className='sm:ml-auto'>
									Cadastrar
								</Button>
							</form>
						</ScrollArea>
					</DrawerContent>
				</Drawer>
			)
		}

		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Adicionar produto</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para adicionar um novo produto.
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={onSubmit} className='flex flex-col gap-4'>
						<div className='flex w-full flex-col gap-2'>
							<Input
								type='text'
								label='Nome do produto'
								placeholder='Nome do produto'
							/>
							<Textarea
								rows={5}
								label='Descrição do produto'
								placeholder='Descrição do produto'
								className='max-h-40 resize-none'
							/>
						</div>

						<div>
							<Button type='button' variant='outline' className='w-full'>
								Categoria
							</Button>
						</div>

						<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
							<div className='flex flex-col gap-2'>
								<Label>Mostrar no catálogo</Label>

								<Select defaultValue='yes'>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Mostrar no catálogo' />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value='yes'>Sim</SelectItem>
										<SelectItem value='no'>Não</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='flex flex-col gap-2'>
								<Label>Destacar no catálogo</Label>

								<Select defaultValue='no'>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Destacar no catálogo' />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value='yes'>Sim</SelectItem>
										<SelectItem value='no'>Não</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
							<Input type='text' label='Estoque' placeholder='10' />
							<Input type='text' label='Preço' placeholder='R$ 10,00' />
						</div>

						<Button type='submit' disabled className='sm:ml-auto'>
							Cadastrar
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		)
	}
)
ModalNewProduct.displayName = 'ModalNewProduct'

export default ModalNewProduct
