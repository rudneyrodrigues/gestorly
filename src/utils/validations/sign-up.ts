import { z } from 'zod'

export const signUpSchema = z
	.object({
		name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
		email: z.string().email('Informe um e-mail válido'),
		password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
		confirmPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'As senhas devem ser iguais',
		path: ['confirmPassword']
	})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
