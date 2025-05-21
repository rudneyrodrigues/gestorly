import { ComponentProps, memo, type FC, type JSX } from 'react'

import { Icon } from '@/components/ui/icon'
import { formatCpfOrCnpj } from '@/utils/format'
import { AppSidebarActiveLink } from './active-link'
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'

type IHeaderAppSidebar = {} & ComponentProps<typeof SidebarMenu>

const HeaderAppSidebar: FC<IHeaderAppSidebar> = memo(
	({ ...props }): JSX.Element => {
		return (
			<SidebarMenu {...props}>
				<SidebarMenuItem>
					<AppSidebarActiveLink size='lg' href='/' shouldMatchExactHref>
						<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
							<Icon.user size={16} />
						</div>
						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-semibold'>Nome da empresa</span>
							<span className='truncate text-xs'>
								{formatCpfOrCnpj('11537609408')}
							</span>
						</div>
						{/* <Icon.caretUpDown className="ml-auto" /> */}
					</AppSidebarActiveLink>
				</SidebarMenuItem>
			</SidebarMenu>
		)
	}
)
HeaderAppSidebar.displayName = 'HeaderAppSidebar'

export { HeaderAppSidebar }
