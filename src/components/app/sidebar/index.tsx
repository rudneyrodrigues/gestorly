import { ComponentProps, memo, type FC, type JSX } from 'react'

import { HeaderAppSidebar } from './header'
import { FooterAppSidebar } from './footer'
import { ContentAppSidebar } from './content'
import {
	Sidebar,
	SidebarHeader,
	SidebarFooter,
	SidebarContent
} from '@/components/ui/sidebar'

type IAppSidebar = ComponentProps<typeof Sidebar> & {}

const AppSidebar: FC<IAppSidebar> = memo(
	({ variant = 'floating', ...props }): JSX.Element => {
		return (
			<Sidebar variant={variant} {...props}>
				<SidebarHeader>
					<HeaderAppSidebar />
				</SidebarHeader>

				<SidebarContent>
					<ContentAppSidebar />
				</SidebarContent>

				<SidebarFooter>
					<FooterAppSidebar />
				</SidebarFooter>
			</Sidebar>
		)
	}
)
AppSidebar.displayName = 'AppSidebar'

export { AppSidebar }
