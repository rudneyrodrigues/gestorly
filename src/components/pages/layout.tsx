import { memo, type ReactElement, type FC, type JSX } from 'react'

import { AppSidebar, Header } from '../app'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'

type ILayout = {
	children: ReactElement
}

const Layout: FC<ILayout> = memo(({ children }): JSX.Element => {
	return (
		<SidebarProvider>
			<AppSidebar />

			<SidebarInset>
				<Header />

				{children}
			</SidebarInset>
		</SidebarProvider>
	)
})
Layout.displayName = 'Layout'

export { Layout }
