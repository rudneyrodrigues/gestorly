'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentProps, memo } from 'react'

import { cn } from '@/lib/utils'
import { useSidebar, SidebarMenuButton } from '@/components/ui/sidebar'

interface AppSidebarActiveLinkProps
	extends ComponentProps<typeof SidebarMenuButton> {
	href: string
	active?: boolean
	external?: boolean
	shouldMatchExactHref?: boolean
}

const AppSidebarActiveLink = memo(
	({
		href,
		active,
		external,
		shouldMatchExactHref = false,
		...props
	}: AppSidebarActiveLinkProps) => {
		const { asPath } = useRouter()
		const { setOpenMobile } = useSidebar()

		let isActive = false

		if (shouldMatchExactHref && asPath === href) {
			isActive = true
		}

		if (!shouldMatchExactHref && asPath.startsWith(String(href))) {
			isActive = true
		}

		return (
			<SidebarMenuButton
				isActive={isActive}
				onClick={() => {
					setOpenMobile(false)
				}}
				asChild
				{...props}
			>
				<Link
					href={href}
					target={external ? '_blank' : undefined}
					tabIndex={active === false ? -1 : undefined}
					aria-disabled={active === false ? true : undefined}
					className={cn(
						'',
						active === false && 'pointer-events-none cursor-not-allowed'
					)}
				>
					{props.children}
				</Link>
			</SidebarMenuButton>
		)
	}
)
AppSidebarActiveLink.displayName = 'AppSidebarActiveLink'

export { AppSidebarActiveLink }
