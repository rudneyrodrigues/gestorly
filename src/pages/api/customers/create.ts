import { z } from 'zod'
import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { firestore } from '@/lib/firebase-admin'
import { newCustomerSchema } from '@/utils/validations/new-customer'

const createCustomerSchema = z
	.object({
		avatar: z.string().optional()
	})
	.merge(newCustomerSchema)

export default async function createCustomer(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}

	const cookies = parseCookies({ req })
	const userUid = cookies['@user.uid']

	if (!userUid) {
		return res.redirect(302, '/sign-in')
	}

	try {
		// Verifique no firebase se já existe um cliente com o mesmo email
		const existingCustomer = await firestore
			.collection('customers')
			.where('email', '==', req.body.email)
			.get()

		if (!existingCustomer.empty) {
			return res.status(409).json({ message: 'Customer already exists' })
		}

		const validatedData = createCustomerSchema.parse(req.body)
		const customerData = {
			...validatedData,
			companyId: userUid,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		const customerRef = firestore.collection('customers').doc()
		await customerRef.set(customerData)

		return res.status(201).json({ id: customerRef.id })
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res
				.status(400)
				.json({ message: 'Invalid data', errors: error.errors })
		}

		return res.status(500).json({ message: 'Internal server error' })
	}
}
