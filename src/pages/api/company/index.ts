import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Company } from '@/types'
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
			const doc = await firestore.collection('companies').doc(userUid).get()

			if (!doc.exists) {
				return res.status(404).json({ message: 'Company not found' })
			}

			const company = {
				...doc.data()
			} as Company

			return res.status(200).json({ company })
		} catch (error) {
			console.error('Error fetching company:', error)
			return res.status(500).json({ message: 'Internal server error' })
		}
	}
}
