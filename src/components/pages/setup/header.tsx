import Link from 'next/link'
import { memo, type FC, type JSX } from 'react'

import { UserMenu } from './user-menu'

const Header: FC = memo((): JSX.Element => {
	return (
		<header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
			<div className='container mx-auto flex h-14 items-center gap-2 px-3 md:gap-4'>
				<Link href='/'>GestorLy</Link>

				<div className='ml-auto'>
					<UserMenu />
				</div>
			</div>
		</header>
	)
})
Header.displayName = 'Header'

export { Header }
