import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Product } from '@/types'
import { firestore } from '@/lib/firebase-admin'

export default async function getProductById(
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
			const productRef = firestore
				.collection('products')
				.doc(req.query.id as string)

			const snapshot = await productRef.get()

			if (!snapshot.exists) {
				return res
					.status(404)
					.json({ product: null, message: 'Product not found' })
			}

			const product = {
				id: snapshot.id,
				...snapshot.data()
			} as Product

			return res.status(200).json({ product })
		} catch (error) {
			return res
				.status(500)
				.json({ product: null, message: 'Internal server error' })
		}
	}
}
