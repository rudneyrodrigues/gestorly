export type Sale = {
	id: string
	customer: string
	product: string
	quantity: number
	date: string // ISO date string
	price: string // formatted price
	total: string // formatted total
}
