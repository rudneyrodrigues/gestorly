import Link from 'next/link'
import { memo, type FC, type JSX } from 'react'

import { Icon } from '../ui/icon'
import { Button } from '../ui/button'
import { SidebarTrigger } from '../ui/sidebar'

const Header: FC = memo((): JSX.Element => {
	return (
		<header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
			<div className='mx-auto flex h-14 items-center gap-2 px-3 md:gap-4'>
				<SidebarTrigger className='size-9' />

				<Link href='/'>GestorLy</Link>

				<div className='ml-auto flex items-center justify-center gap-2'>
					<Button
						variant='outline'
						rightIcon='magnifyingGlass'
						className='cursor-pointer'
					>
						Pesquisar na plataforma
					</Button>
					<Button size='icon' variant='outline'>
						<Icon.bell size={5} />
					</Button>
				</div>
			</div>
		</header>
	)
})
Header.displayName = 'Header'

export { Header }
