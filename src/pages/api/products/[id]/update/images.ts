import { z } from 'zod'
import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { firestore } from '@/lib/firebase-admin'

const updateProductImagesSchema = z.object({
	images: z.array(z.string().url()).min(1, 'At least one image is required')
})

export default async function updateProductImages(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cookies = parseCookies({ req })
	const userUid = cookies['@user.uid']

	if (!userUid) {
		return res.redirect(302, '/sign-in')
	}

	if (req.method !== 'PUT') {
		return res.status(405).end()
	}

	const { id } = req.query
	const data = updateProductImagesSchema.parse(req.body)

	try {
		// Update product in database
		await firestore
			.collection('products')
			.doc(id as string)
			.update({
				...data,
				updatedAt: new Date().toISOString(),
				updatedBy: userUid // Assuming you want to track who updated the product
			})

		return res.status(200).json({ message: 'Product updated successfully' })
	} catch (error) {
		console.error('Error updating product:', error)
		return res.status(500).json({ message: 'Error updating product' })
	}
}
