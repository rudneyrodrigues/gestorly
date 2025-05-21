import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'

import { AuthProvider } from '@/providers'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<style jsx global>{`
				:root {
					--font-inter: ${inter.style.fontFamily};
				}
			`}</style>

			<Component {...pageProps} />
			<NextTopLoader showSpinner={false} />
			<Toaster closeButton richColors position='bottom-right' />
		</AuthProvider>
	)
}
