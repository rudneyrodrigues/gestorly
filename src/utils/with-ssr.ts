import { destroyCookie, parseCookies } from 'nookies'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AuthTokenError } from './errors'

export function withSSRAuth<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (ctx: GetServerSidePropsContext) => {
		const cookies = parseCookies(ctx)

		if (!cookies['@user.uid']) {
			return {
				redirect: {
					destination: '/sign-in',
					permanent: false
				}
			}
		}

		try {
			return await fn(ctx)
		} catch (err) {
			if (err instanceof AuthTokenError) {
				destroyCookie(ctx, '@user.uid')

				return {
					redirect: {
						destination: '/sign-in',
						permanent: false
					}
				}
			}

			throw err
		}
	}
}

export function withSSRGuest<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (ctx: GetServerSidePropsContext) => {
		const cookies = parseCookies(ctx)

		if (cookies['@user.uid']) {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}

		return await fn(ctx)
	}
}
