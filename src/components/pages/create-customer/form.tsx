import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	memo,
	lazy,
	type FC,
	type JSX,
	useState,
	Suspense,
	type ComponentProps
} from 'react'

import { cn } from '@/lib/utils'
import { api } from '@/services/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { uploadAvatar } from '@/actions/upload-avatar'
import { formatPhone, formatCpfOrCnpj } from '@/utils/format'
import {
	newCustomerSchema,
	type NewCustomerSchemaType
} from '@/utils/validations/new-customer'
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form'

const UploadAvatar = lazy(() => import('./upload-avatar'))

type IFormNewCustomer = {} & ComponentProps<'form'>

const FormCreateCustomer: FC<IFormNewCustomer> = memo(
	({ className, ...props }): JSX.Element => {
		const router = useRouter()
		const [avatar, setAvatar] = useState<File>()
		const [loading, setLoading] = useState<boolean>(false)

		const form = useForm<NewCustomerSchemaType>({
			resolver: zodResolver(newCustomerSchema),
			defaultValues: {
				name: '',
				email: '',
				phone: '',
				cpf_or_cnpj: ''
			}
		})

		const onSubmit = async (values: NewCustomerSchemaType) => {
			setLoading(true)

			toast.promise(
				async () => {
					let avatarUrl: string | undefined = undefined

					if (avatar) {
						avatarUrl = await uploadAvatar({
							email: values.email,
							avatarFile: avatar
						})
					}

					const response = await api
						.post('/customers/create', {
							...values,
							avatar: avatarUrl
						})
						.then(res => res.data)

					return response as { id: string }
				},
				{
					loading: 'Cadastrando cliente...',
					success: data => {
						console.log('Cliente cadastrado com sucesso:', data.id)
						router.push('/customers')

						return 'Cliente cadastrado com sucesso!'
					},
					error: 'Erro ao cadastrar cliente',
					finally: () => {
						setLoading(false)
					}
				}
			)
		}

		return (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn('flex flex-col gap-6', className)}
					{...props}
				>
					<div>
						<div className='mx-auto flex size-40 overflow-hidden rounded-md border border-dashed'>
							<Suspense fallback={<Skeleton className='h-full w-full' />}>
								<UploadAvatar setAvatar={setAvatar} />
							</Suspense>
						</div>
					</div>

					<div className='flex flex-col gap-4'>
						<div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
							<FormField
								name='name'
								disabled={loading}
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome do cliente</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='João da Silva'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name='email'
								disabled={loading}
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='joao.silva@example.com'
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
								name='phone'
								disabled={loading}
								control={form.control}
								render={({ field }) => {
									const formatUserPhone = (value: string) => {
										return formatPhone(value)
									}

									const handlePhoneChange = (
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										const formattedValue = formatUserPhone(e.target.value)
										field.onChange(formattedValue)
									}

									return (
										<FormItem>
											<FormLabel>Telefone</FormLabel>
											<FormControl>
												<Input
													type='text'
													maxLength={15}
													ref={field.ref}
													name={field.name}
													value={field.value}
													onBlur={field.onBlur}
													disabled={field.disabled}
													placeholder='(11) 91234-5678'
													onChange={handlePhoneChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								name='cpf_or_cnpj'
								disabled={loading}
								control={form.control}
								render={({ field }) => {
									const formatUserCpfOrCnpj = (value: string) => {
										return formatCpfOrCnpj(value)
									}

									const handleCpfOrCnpjChange = (
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										const formattedValue = formatUserCpfOrCnpj(e.target.value)
										field.onChange(formattedValue)
									}

									return (
										<FormItem>
											<FormLabel>CPF ou CNPJ</FormLabel>
											<FormControl>
												<Input
													type='text'
													maxLength={18}
													ref={field.ref}
													name={field.name}
													value={field.value}
													onBlur={field.onBlur}
													disabled={field.disabled}
													onChange={handleCpfOrCnpjChange}
													placeholder='000.000.000-00 ou 00.000.000/0000-00'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
					</div>

					<Button
						type='submit'
						loadingText='Cadastrando...'
						loading={form.formState.isSubmitting || loading}
						disabled={
							!form.formState.isValid || form.formState.isSubmitting || loading
						}
						className='sm:ml-auto'
					>
						Cadastrar
					</Button>
				</form>
			</Form>
		)
	}
)
FormCreateCustomer.displayName = 'FormCreateCustomer'

export default FormCreateCustomer
