import { z } from 'zod'

export const newCustomerSchema = z.object({
	name: z
		.string()
		.min(2, 'Nome do cliente deve ter pelo menos 2 caracteres')
		.max(100)
		.nonempty('Nome do cliente é obrigatório')
		.transform(value => value.trim()),
	email: z
		.string()
		.email('Email inválido')
		.nonempty('Email do cliente é obrigatório')
		.transform(value => value.trim()),
	phone: z
		.string()
		.nonempty('Telefone do cliente é obrigatório')
		.transform(value => value.replace(/\D/g, ''))
		.refine(value => !isNaN(Number(value)), {
			message: 'Telefone deve ser um número válido'
		}),
	cpf_or_cnpj: z
		.string()
		.nonempty('CPF ou CNPJ do cliente é obrigatório')
		.transform(value => value.replace(/\D/g, ''))
		.refine(value => value.length === 11 || value.length === 14, {
			message: 'Informe um CPF ou CNPJ válido.'
		}),
	avatar: z
		.string()
		.url('URL inválida')
		.optional()
		.transform(value => (value ? value.trim() : value))
})

export type NewCustomerSchemaType = z.infer<typeof newCustomerSchema>
