import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, type FC, type JSX, useState, ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { UploadImages } from '@/components/app'
import { Button } from '@/components/ui/button'
import { categories } from '@/utils/categories'
import { Textarea } from '@/components/ui/textarea'
import { formatPrice, formatNumber } from '@/utils/format'
import {
	newProductSchema,
	type NewProductSchemaType
} from '@/utils/validations/new-product'
import {
	Select,
	SelectItem,
	SelectValue,
	SelectTrigger,
	SelectContent
} from '@/components/ui/select'
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form'

type IFormNewProduct = {} & ComponentProps<'form'>

const FormCreateProduct: FC<IFormNewProduct> = memo(
	({ className, ...props }): JSX.Element => {
		const router = useRouter()
		const [selectedImages, setSelectedImages] = useState<string[]>([])

		const form = useForm<NewProductSchemaType>({
			resolver: zodResolver(newProductSchema),
			defaultValues: {
				name: '',
				price: '',
				stock: '',
				category: '',
				description: '',
				showInCatalog: true,
				highlightInCatalog: false
			}
		})

		const onSubmit = async (values: NewProductSchemaType) => {
			let product = {
				...values,
				price: values.price.replace(/\D/g, ''),
				stock: values.stock.replace(/\D/g, '')
			}

			if (selectedImages.length === 0) {
				toast.error('Por favor, adicione pelo menos uma imagem do produto.')
				return
			}

			try {
				toast.promise(
					async () => {
						const response = (await api
							.post('/products/create', { ...product, images: selectedImages })
							.then(res => res.data)) as { id: string }

						return response
					},
					{
						loading: 'Cadastrando produto...',
						success: data => {
							router.push(`/products/${data.id}`)

							return `Produto cadastrado com sucesso!`
						},
						error: err => {
							console.error(err)
							return 'Erro ao cadastrar o produto. Tente novamente mais tarde.'
						}
					}
				)
			} catch (error) {
				console.error(error)
				toast.error('Erro ao cadastrar o produto. Tente novamente mais tarde.')
			}
		}

		return (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn('flex flex-col gap-6', className)}
					{...props}
				>
					<div className='flex flex-col gap-4'>
						<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
							<FormField
								name='name'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome do produto</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='Notebook Dell Inspiron'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='category'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Categoria</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange}>
												<SelectTrigger className='min-h-10 w-full'>
													<SelectValue placeholder='Selecione uma categoria' />
												</SelectTrigger>

												<SelectContent>
													{categories.map(category => (
														<SelectItem
															key={category.value}
															value={category.value}
														>
															{category.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='flex w-full flex-col gap-4'>
							<FormField
								name='description'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descrição do produto</FormLabel>
										<FormControl>
											<Textarea
												rows={5}
												placeholder='Notebook Dell Inspiron com 16GB de RAM e 512GB de SSD'
												className='max-h-40 resize-none'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
							<FormField
								control={form.control}
								name='showInCatalog'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mostrar no catálogo</FormLabel>
										<FormControl>
											<Select
												onValueChange={e => {
													field.onChange(e === 'yes')
												}}
												defaultValue='yes'
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Mostrar no catálogo' />
												</SelectTrigger>

												<SelectContent>
													<SelectItem value='yes'>Sim</SelectItem>
													<SelectItem value='no'>Não</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='highlightInCatalog'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Destacar no catálogo</FormLabel>
										<FormControl>
											<Select
												onValueChange={e => {
													field.onChange(e === 'yes')
												}}
												defaultValue='no'
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Destacar no catálogo' />
												</SelectTrigger>

												<SelectContent>
													<SelectItem value='yes'>Sim</SelectItem>
													<SelectItem value='no'>Não</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
							<FormField
								name='stock'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Estoque</FormLabel>
										<FormControl>
											<Input
												type='text'
												maxLength={10}
												placeholder='10'
												onChange={e => {
													const value = e.target.value.replace(/\D/g, '')
													field.onChange(formatNumber(value))
												}}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name='price'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Preço</FormLabel>
										<FormControl>
											<Input
												type='text'
												maxLength={12}
												placeholder='R$ 0,00'
												onChange={e => {
													const value = e.target.value.replace(/\D/g, '')
													field.onChange(formatPrice(value))
												}}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-2 rounded-md sm:grid-cols-3 md:grid-cols-4'>
							<UploadImages
								selectedImages={selectedImages}
								setSelectedImages={setSelectedImages}
							>
								<div className='hover:bg-muted flex h-full min-h-[156px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-2'>
									<Icon.plus />
									<span className='text-muted-foreground text-center text-xs'>
										Adicionar imagens
									</span>
								</div>
							</UploadImages>

							{selectedImages.map((image, index) => (
								<div
									key={index}
									className='bg-muted relative flex w-full items-center justify-center rounded-md border'
								>
									<img
										alt={`Preview ${index + 1}`}
										src={image}
										className='h-full w-full rounded-md object-cover'
									/>
									<button
										type='button'
										className='bg-accent hover:bg-accent/80 absolute top-1 right-1 rounded-full p-1 transition-colors'
										onClick={() => {
											setSelectedImages(prevImages =>
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
					</div>

					<Button
						type='submit'
						loading={form.formState.isSubmitting}
						disabled={!form.formState.isValid || form.formState.isSubmitting}
						className='sm:ml-auto'
					>
						Cadastrar
					</Button>
				</form>
			</Form>
		)
	}
)
FormCreateProduct.displayName = 'FormCreateProduct'

export default FormCreateProduct
