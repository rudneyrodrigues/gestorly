import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string({
			required_error: 'E-mail é obrigatório'
		})
		.email('Informe um e-mail válido'),
	password: z
		.string({
			required_error: 'Senha é obrigatória'
		})
		.min(6, 'Senha deve ter no mínimo 6 caracteres')
})

export type SignInSchemaType = z.infer<typeof signInSchema>
