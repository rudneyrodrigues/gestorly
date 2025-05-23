import Link from 'next/link'
import { memo, type FC, type JSX } from 'react'

import { cn } from '@/lib/utils'
import { Icon } from '../ui/icon'
import { Button } from '../ui/button'
import { SidebarTrigger } from '../ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'

const Header: FC = memo((): JSX.Element => {
	const isMobile = useIsMobile()

	return (
		<header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
			<div className='mx-auto flex h-14 items-center gap-2 px-3 md:gap-4'>
				<SidebarTrigger className='size-9' />

				<Link href='/'>GestorLy</Link>

				<div className='ml-auto flex items-center justify-center gap-2'>
					<Button
						size={isMobile ? 'icon' : 'default'}
						variant='outline'
						className='cursor-pointer'
					>
						<span className={cn('hidden', !isMobile && 'inline-flex')}>
							Pesquisar na plataforma
						</span>
						<Icon.magnifyingGlass />
					</Button>
					<Button size='icon' variant='outline'>
						<Icon.bell />
					</Button>
				</div>
			</div>
		</header>
	)
})
Header.displayName = 'Header'

export { Header }
