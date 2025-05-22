import { parseCookies } from 'nookies'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { CheckCompanyError } from './errors'
import { firestore } from '@/lib/firebase-admin'

export function withCompany<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (ctx: GetServerSidePropsContext) => {
		const cookies = parseCookies(ctx)
		const userUid = cookies['@user.uid']

		const doc = await firestore.collection('companies').doc(userUid).get()

		if (!doc.exists) {
			return {
				redirect: {
					destination: '/setup',
					permanent: false
				}
			}
		}

		try {
			return await fn(ctx)
		} catch (err) {
			if (err instanceof CheckCompanyError) {
				return {
					redirect: {
						destination: '/setup',
						permanent: false
					}
				}
			}

			throw err
		}
	}
}
