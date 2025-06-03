import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, type FC, type JSX, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { categories } from '@/utils/categories'
import { Textarea } from '@/components/ui/textarea'
import { formatPrice, formatNumber } from '@/utils/format'
import { useGetProductById } from '@/hooks/swr/use-get-product-by-id'
import {
	viewProductSchema,
	type ViewProductSchemaType
} from '@/utils/validations/view-product'
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

type DefaultValues = {
	id: string
	showInCatalog: boolean
	highlightInCatalog: boolean
} & Omit<ViewProductSchemaType, 'showInCatalog' | 'highlightInCatalog'>

type IFormViewProduct = {
	defaultValues: DefaultValues
} & ComponentProps<'form'>

const FormViewProduct: FC<IFormViewProduct> = memo(
	({ className, defaultValues, ...props }): JSX.Element => {
		const router = useRouter()
		const { mutate } = useGetProductById(router.query.id as string)

		const form = useForm<ViewProductSchemaType>({
			resolver: zodResolver(viewProductSchema),
			defaultValues: {
				name: defaultValues.name,
				price: formatPrice(defaultValues.price),
				stock: formatNumber(defaultValues.stock),
				category: defaultValues.category,
				description: defaultValues.description,
				showInCatalog: defaultValues.showInCatalog,
				highlightInCatalog: defaultValues.highlightInCatalog
			}
		})

		const onSubmit = async (values: ViewProductSchemaType) => {
			const { id } = defaultValues

			try {
				toast.promise(
					async () => {
						const response = await api.put(`/products/${id}/update`, {
							...values
						})

						return response
					},
					{
						loading: 'Atualizando produto...',
						success: data => {
							mutate()
							router.reload()
							console.log(data)
							return 'Produto atualizado com sucesso!'
						},
						error: err => {
							console.error(err)
							return 'Erro ao atualizar o produto. Tente novamente mais tarde.'
						}
					}
				)
			} catch (error) {
				console.error(error)
				toast.error('Erro ao atualizar o produto. Tente novamente mais tarde.')
			}
		}

		return (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn('flex w-full flex-col gap-6', className)}
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
											<Select
												defaultValue={defaultValues.category}
												onValueChange={field.onChange}
											>
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
												defaultValue={
													defaultValues.showInCatalog ? 'yes' : 'no'
												}
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
												defaultValue={
													defaultValues.highlightInCatalog ? 'yes' : 'no'
												}
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
					</div>

					<Button
						type='submit'
						loading={form.formState.isSubmitting}
						disabled={
							// Desabilita o botão se o formulário não for válido
							!form.formState.isValid ||
							// Desabilita o botão se o formulário estiver enviando
							form.formState.isSubmitting ||
							// Desabilita o botão se o formulário não estiver sujo
							!form.formState.isDirty
						}
						className='sm:ml-auto'
					>
						Atualizar produto
					</Button>
				</form>
			</Form>
		)
	}
)
FormViewProduct.displayName = 'FormViewProduct'

export default FormViewProduct
