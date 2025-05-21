export type Company = {
	// id: string
	email: string
	cpf_or_cnpj: string
	company_name: string
	slug: string
	phone: string
	address?: string
	whatsapp: string
	description?: string
	createdBy: string
	createdAt: string
}

export type CreateCompanyForm = Omit<
	Company,
	'slug' | 'createdBy' | 'createdAt'
>
