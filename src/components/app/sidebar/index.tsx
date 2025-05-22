import { memo, type FC, type JSX, type ComponentProps } from 'react'

import { HeaderAppSidebar } from './header'
import { FooterAppSidebar } from './footer'
import { Icon } from '@/components/ui/icon'
import { ContentAppSidebar } from './content'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCompany } from '@/hooks/swr/use-get-company'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	Sidebar,
	SidebarHeader,
	SidebarFooter,
	SidebarContent
} from '@/components/ui/sidebar'

type IAppSidebar = ComponentProps<typeof Sidebar> & {}

const AppSidebar: FC<IAppSidebar> = memo(
	({ variant = 'floating', ...props }): JSX.Element => {
		const { error, company, loading } = useGetCompany()

		if (loading) {
			return (
				<Sidebar variant={variant} {...props}>
					<SidebarHeader>
						<Skeleton className='h-10' />
					</SidebarHeader>

					<SidebarContent>
						<Skeleton className='h-4' />
						<Skeleton className='h-4' />
						<Skeleton className='h-4' />
						<Skeleton className='h-4' />
					</SidebarContent>

					<SidebarFooter>
						<Skeleton className='h-10' />
					</SidebarFooter>
				</Sidebar>
			)
		}

		if (error || !company) {
			return (
				<Sidebar variant={variant} {...props}>
					<SidebarHeader>
						<Alert>
							<Icon.alert size={5} />
							<AlertTitle>Erro</AlertTitle>
							<AlertDescription>
								Não foi possível carregar as informações da empresa.
							</AlertDescription>
						</Alert>
					</SidebarHeader>

					<SidebarContent>
						<Skeleton className='h-4' />
						<Skeleton className='h-4' />
						<Skeleton className='h-4' />
						<Skeleton className='h-4' />
					</SidebarContent>

					<SidebarFooter>
						<Skeleton className='h-10' />
					</SidebarFooter>
				</Sidebar>
			)
		}

		return (
			<Sidebar variant={variant} {...props}>
				<SidebarHeader>
					<HeaderAppSidebar company={company} />
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
