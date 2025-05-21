import { z } from 'zod'

export const registerNewCompanySchema = z.object({
	company_name: z.string().min(3, 'Informe o nome da empresa'),
	cpf_or_cnpj: z
		.string()
		.transform(doc => doc.replace(/\D/g, ''))
		.refine(doc => doc.length === 11 || doc.length === 14, {
			message: 'Informe um CPF ou CNPJ válido.'
		}),
	address: z.string().optional(),
	description: z.string().max(500).optional(),
	email: z.string().email('Informe um e-mail válido'),
	phone: z
		.string()
		.transform(doc => doc.replace(/\D/g, ''))
		.refine(doc => doc.length >= 10 && doc.length <= 11, {
			message: 'Informe um telefone válido.'
		}),
	whatsapp: z
		.string()
		.transform(doc => doc.replace(/\D/g, ''))
		.refine(doc => doc.length >= 10 && doc.length <= 11, {
			message: 'Informe um WhatsApp válido.'
		})
})

export type RegisterNewCompanySchemaType = z.infer<
	typeof registerNewCompanySchema
>
