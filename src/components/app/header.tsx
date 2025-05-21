import Link from 'next/link'
import { memo, type FC, type JSX } from 'react'

import { SidebarTrigger } from '../ui/sidebar'

const Header: FC = memo((): JSX.Element => {
	return (
		<header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
			<div className='mx-auto flex h-14 items-center gap-2 px-3 md:gap-4'>
				<SidebarTrigger className='size-9' />

				<Link href='/'>GestorLy</Link>
			</div>
		</header>
	)
})
Header.displayName = 'Header'

export { Header }
