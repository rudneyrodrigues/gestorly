type Payment = {
	id: string
	amount: number
	email: string
	status: 'pending' | 'processing' | 'success' | 'failed'
}

export const payments: Payment[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'm@example.com'
	},
	{
		id: '489e1d42',
		amount: 125,
		status: 'processing',
		email: 'example@gmail.com'
	},
	{
		id: 'f2a1d3b4',
		amount: 200,
		status: 'success',
		email: 'f@example.com'
	}
]
