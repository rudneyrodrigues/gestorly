import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Customer } from '@/types'
import { firestore } from '@/lib/firebase-admin'

export default async function getCustomerById(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}

	const cookies = parseCookies({ req })
	const userUid = cookies['@user.uid']

	if (!userUid) {
		return res.redirect(302, '/sign-in')
	}

	try {
		const customerRef = firestore
			.collection('customers')
			.doc(req.query.id as string)

		const snapshot = await customerRef.get()

		if (!snapshot.exists) {
			return res
				.status(404)
				.json({ product: null, message: 'Customer not found' })
		}

		const customer = {
			id: snapshot.id,
			...snapshot.data()
		} as Customer

		return res.status(200).json({ customer })
	} catch (error) {
		return res
			.status(500)
			.json({ customer: null, message: 'Internal server error' })
	}
}
