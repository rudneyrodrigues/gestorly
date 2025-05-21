import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useState, type FC, type JSX } from 'react'

import { api } from '@/services/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/animation'
import { Textarea } from '@/components/ui/textarea'
import { formatPhone, formatCpfOrCnpj } from '@/utils/format'
import {
	registerNewCompanySchema,
	type RegisterNewCompanySchemaType
} from '@/utils/validations/setup'

const FormNewCompany: FC = memo((): JSX.Element => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<RegisterNewCompanySchemaType>({
		resolver: zodResolver(registerNewCompanySchema),
		defaultValues: {
			company_name: '',
			cpf_or_cnpj: '',
			address: '',
			description: '',
			email: '',
			phone: '',
			whatsapp: ''
		}
	})

	const onSubmit = async (values: RegisterNewCompanySchemaType) => {
		setLoading(true)

		toast.promise(api.post('/company/create', values), {
			loading: 'Cadastrando empresa...',
			success: () => {
				router.push('/')
				return 'Empresa cadastrada com sucesso!'
			},
			error: error => {
				console.error(error)

				return error.response?.data?.message || 'Erro ao cadastrar empresa'
			},
			finally: () => setLoading(false)
		})
	}

	return (
		<FadeIn
			to='top'
			as='form'
			delay={0.1}
			duration={0.5}
			startOnScrollIntersect
			onSubmit={handleSubmit(onSubmit)}
			className='flex w-full max-w-xl flex-1 flex-col gap-6'
		>
			<div className='space-y-4'>
				<Input
					type='text'
					label='Nome da empresa'
					error={errors.company_name}
					{...register('company_name')}
					disabled={loading || isSubmitting}
					placeholder='Digite o nome da empresa'
				/>

				<div className='grid grid-cols-1 items-start gap-4 md:grid-cols-2'>
					<Input
						type='text'
						maxLength={18}
						label='CPF ou CNPJ'
						error={errors.cpf_or_cnpj}
						disabled={loading || isSubmitting}
						placeholder='Digite o CPF ou CNPJ'
						{...register('cpf_or_cnpj', {
							onChange: e => {
								const { value } = e.target
								const formattedValue = formatCpfOrCnpj(value)
								e.target.value = formattedValue
							}
						})}
					/>

					<Input
						type='email'
						label='E-mail'
						error={errors.email}
						{...register('email')}
						disabled={loading || isSubmitting}
						placeholder='Digite o e-mail da empresa'
					/>
				</div>

				<Input
					type='text'
					label='Endereço'
					error={errors.address}
					{...register('address')}
					disabled={loading || isSubmitting}
					placeholder='Digite o endereço da empresa'
				/>

				<Textarea
					label='Descrição'
					error={errors.description}
					{...register('description')}
					disabled={loading || isSubmitting}
					placeholder='Digite a descrição da empresa'
					className='h-24 max-h-40 resize-y'
				/>

				<div className='grid grid-cols-1 items-start gap-4 md:grid-cols-2'>
					<Input
						type='text'
						maxLength={15}
						label='Telefone'
						error={errors.phone}
						disabled={loading || isSubmitting}
						placeholder='Digite o telefone da empresa'
						{...register('phone', {
							onChange: e => {
								const { value } = e.target
								const formattedValue = formatPhone(value)
								e.target.value = formattedValue
							}
						})}
					/>
					<Input
						type='text'
						maxLength={15}
						label='Whatsapp'
						error={errors.whatsapp}
						disabled={loading || isSubmitting}
						placeholder='Digite o whatsapp da empresa'
						{...register('whatsapp', {
							onChange: e => {
								const { value } = e.target
								const formattedValue = formatPhone(value)
								e.target.value = formattedValue
							}
						})}
					/>
				</div>
			</div>

			<Button
				type='submit'
				loading={loading || isSubmitting}
				className='ml-auto w-full md:w-auto'
			>
				Cadastrar
			</Button>
		</FadeIn>
	)
})
FormNewCompany.displayName = 'FormNewCompany'

export { FormNewCompany }
