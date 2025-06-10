import { fakerPT_BR as faker } from '@faker-js/faker'

import { Sale } from '@/types'

function generateSalesData(): Sale {
	const customer = faker.person.fullName()
	const product = faker.commerce.productName()
	const quantity = faker.number.int({ min: 1, max: 100 })
	const price = faker.commerce.price({ min: 10, max: 1000, dec: 2 })
	const total = (
		faker.number.int({ min: 1, max: 100 }) * parseFloat(price)
	).toFixed(2)
	const date = faker.date.recent().toISOString().split('T')[0]
	const id = faker.string.uuid()

	return {
		id,
		customer,
		product,
		quantity,
		date,
		price,
		total
	}
}

export const salesData = Array.from({ length: 100 }, generateSalesData)
