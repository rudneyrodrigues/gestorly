import { parseCookies } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

import { auth } from '@/lib/firebase-admin'

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
			const user = await auth.getUser(userUid)

			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			return res.status(200).json({ user })
		} catch (error) {
			console.error('Error fetching company:', error)
			return res.status(500).json({ message: 'Internal server error' })
		}
	}
}
