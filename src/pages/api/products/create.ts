import { z } from 'zod'
import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { firestore } from '@/lib/firebase-admin'
import { newProductSchema } from '@/utils/validations/new-product'

const createProductSchema = z
	.object({
		images: z.array(z.string().url()).min(1, 'At least one image is required')
	})
	.merge(newProductSchema)

export default async function createProduct(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const data = newProductSchema.parse(req.body)
		const cookies = parseCookies({ req })
		const userUid = cookies['@user.uid']

		if (!userUid) {
			return res.redirect(302, '/sign-in')
		}

		const product = {
			...data,
			createdBy: userUid,
			companyId: userUid, // Assuming companyId is the same as userUid
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		try {
			await firestore.collection('products').add(product)

			return res.status(201).json({
				message: 'Product created successfully'
			})
		} catch (error) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}
