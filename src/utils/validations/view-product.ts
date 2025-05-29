import { z } from 'zod'

export const viewProductSchema = z.object({
	name: z
		.string()
		.min(2, 'Nome do produto deve ter pelo menos 2 caracteres')
		.max(100)
		.nonempty('Nome do produto é obrigatório')
		.transform(value => value.trim()),
	description: z
		.string()
		.min(10, 'Descrição do produto deve ter pelo menos 10 caracteres')
		.max(500)
		.nonempty('Descrição do produto é obrigatória')
		.transform(value => value.trim()),
	price: z
		.string()
		.nonempty('Preço do produto é obrigatório')
		.transform(value => value.replace(/\D/g, ''))
		.refine(value => !isNaN(Number(value)), {
			message: 'Preço deve ser um número válido'
		}),
	stock: z
		.string()
		.nonempty('Estoque do produto é obrigatório')
		.transform(value => value.replace(/\D/g, ''))
		.refine(value => !isNaN(Number(value)), {
			message: 'Estoque deve ser um número válido'
		}),
	showInCatalog: z.boolean().default(true).optional(),
	highlightInCatalog: z.boolean().default(false).optional(),
	category: z
		.string()
		.min(2, 'Categoria do produto deve ter pelo menos 2 caracteres')
		.max(100)
		.nonempty('Categoria do produto é obrigatória')
	// images: z
	// 	.array(z.string().url('URL inválida'))
	// 	.min(1, 'Pelo menos uma imagem é obrigatória')
})

export type ViewProductSchemaType = z.infer<typeof viewProductSchema>
