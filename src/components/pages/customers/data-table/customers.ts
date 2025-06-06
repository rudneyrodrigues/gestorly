import { fakerPT_BR as faker } from '@faker-js/faker'

import { Customer } from '@/types'

function createRandomCustomer(): Customer {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

	return {
		id: faker.string.uuid(),
		name: `${firstName} ${lastName}`,
		email: faker.internet.email({
			firstName: firstName,
			lastName: lastName,
			allowSpecialCharacters: false,
			provider: 'example.com'
		}),
		avatar: faker.image.avatar(),
		phone: faker.phone.number(),
		cpf_or_cnpj: faker.string.numeric({ length: 11 }) // Assuming CPF for simplicity
	}
}

export const customers: Customer[] = faker.helpers.multiple(
	createRandomCustomer,
	{
		count: 100 // Adjust the count as needed
	}
)
