import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import { AuthProvider } from '@/providers'
import { NextPageWithLayout } from '@/types'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page)

	return (
		<AuthProvider>
			<style jsx global>{`
				:root {
					--font-inter: ${inter.style.fontFamily};
				}
			`}</style>

			{getLayout(<Component {...pageProps} />)}
			<NextTopLoader showSpinner={false} />
			<Toaster closeButton richColors position='top-right' />
		</AuthProvider>
	)
}
