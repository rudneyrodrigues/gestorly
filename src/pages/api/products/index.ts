import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Product } from '@/types'
import { firestore } from '@/lib/firebase-admin'

export default async function createCompany(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const cookies = parseCookies({ req })
		const userUid = cookies['@user.uid']

		if (!userUid) {
			return res.redirect(302, '/sign-in')
		}

		try {
			const productsRef = firestore.collection('products')

			const snapshot = await productsRef.where('companyId', '==', userUid).get()

			if (snapshot.empty) {
				return res.status(200).json({ products: [] })
			}

			const products: Product[] = []
			snapshot.forEach(doc => {
				products.push({ id: doc.id, ...doc.data() } as Product)
			})

			const orderedProductsByUpdatedAt = products.sort((a, b) => {
				return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
			})

			return res.status(200).json({
				products: orderedProductsByUpdatedAt
			})
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' })
		}
	}
}
