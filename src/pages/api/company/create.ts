import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { firestore } from '@/lib/firebase-admin'
import { registerNewCompanySchema } from '@/utils/validations/setup'

type ResponseData = {
	message: string
}

export default async function createCompany(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method === 'POST') {
		const data = registerNewCompanySchema.parse(req.body)
		const cookies = parseCookies({ req })
		const userUid = cookies['@user.uid']

		if (!userUid) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const company = {
			...data,
			createdBy: userUid,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		try {
			await firestore.collection('companies').doc(userUid).set(company)

			return res.status(201).json({
				message: 'Company created successfully'
			})
		} catch (error) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}
