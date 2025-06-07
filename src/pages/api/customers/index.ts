import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Customer } from '@/types'
import { firestore } from '@/lib/firebase-admin'

export default async function getCustomers(
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
		const customersRef = firestore.collection('customers')

		const snapshot = await customersRef.where('companyId', '==', userUid).get()

		if (snapshot.empty) {
			return res.status(200).json({ customers: [] })
		}

		const customers: Customer[] = []
		snapshot.forEach(doc => {
			customers.push({ id: doc.id, ...doc.data() } as Customer)
		})

		const orderedCustomersByUpdatedAt = customers.sort((a, b) => {
			return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
		})

		return res.status(200).json({
			customers: orderedCustomersByUpdatedAt
		})
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' })
	}
}
