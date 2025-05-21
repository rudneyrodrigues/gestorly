import { memo, type FC, type JSX } from 'react'

import { Icon } from '@/components/ui/icon'
import { AppSidebarActiveLink } from './active-link'
import {
	SidebarMenu,
	SidebarGroup,
	SidebarMenuItem
} from '@/components/ui/sidebar'

const ContentAppSidebar: FC = memo((): JSX.Element => {
	return (
		<SidebarGroup>
			<SidebarMenu>
				<SidebarMenuItem>
					<AppSidebarActiveLink href='/' shouldMatchExactHref>
						<Icon.house />
						Dashboard
					</AppSidebarActiveLink>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<AppSidebarActiveLink href='/products'>
						<Icon.archive />
						Produtos
					</AppSidebarActiveLink>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<AppSidebarActiveLink href='/sales'>
						<Icon.creditCard />
						Vendas
					</AppSidebarActiveLink>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<AppSidebarActiveLink href='/customers'>
						<Icon.users />
						Clientes
					</AppSidebarActiveLink>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<AppSidebarActiveLink href='/settings'>
						<Icon.gear />
						Configurações
					</AppSidebarActiveLink>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	)
})
ContentAppSidebar.displayName = 'ContentAppSidebar'

export { ContentAppSidebar }
