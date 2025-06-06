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
import { formatNumber, formatCpfOrCnpj } from '@/utils/format'
import {
	newCustomerSchema,
	type NewCustomerSchemaType
} from '@/utils/validations/new-customer'
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

type IFormNewCustomer = {} & ComponentProps<'form'>

const FormCreateCustomer: FC<IFormNewCustomer> = memo(
	({ className, ...props }): JSX.Element => {
		const router = useRouter()
		const [avatar, setAvatar] = useState<string | null>(null)

		const form = useForm<NewCustomerSchemaType>({
			resolver: zodResolver(newCustomerSchema),
			defaultValues: {
				name: '',
				email: '',
				phone: '',
				cpf_or_cnpj: '',
				avatar: ''
			}
		})

		const onSubmit = async (values: NewCustomerSchemaType) => {
			console.log('values', values)
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
								control={form.control}
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>Telefone</FormLabel>
											<FormControl>
												<Input
													type='text'
													placeholder='(11) 91234-5678'
													{...field}
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
FormCreateCustomer.displayName = 'FormCreateCustomer'

export default FormCreateCustomer
