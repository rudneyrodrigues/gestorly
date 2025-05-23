import { memo, type FC, type JSX } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUser } from '@/hooks/swr/use-get-user'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	useSidebar,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton
} from '@/components/ui/sidebar'
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

const FooterAppSidebar: FC = memo((): JSX.Element => {
	const { logout } = useAuth()
	const { isMobile } = useSidebar()
	const { user, error, loading } = useGetUser()

	if (loading) return <Skeleton className='min-h-10 w-full' />

	if (error || !user) {
		return (
			<Alert>
				<Icon.alert size={5} />
				<AlertTitle>Erro ao carregar usuário</AlertTitle>
				<AlertDescription>
					{error?.message ||
						'Não foi possível carregar as informações do usuário.'}
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<Avatar>
								<AvatarImage
									src={
										user.photoURL ? user.photoURL : '/images/default-avatar.png'
									}
									alt={`Avatar de ${user.displayName}`}
								/>
								<AvatarFallback>
									{String(user.displayName)
										.split(' ')
										.map(n => n[0])
										.slice(0, 2)
										.join('')}
								</AvatarFallback>
							</Avatar>

							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>
									{user.displayName}
								</span>
								<span className='truncate text-xs'>{user.email}</span>
							</div>

							<Icon.caretUpDown size={16} className='ml-auto' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align='end'
						sideOffset={4}
						side={isMobile ? 'bottom' : 'right'}
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar>
									<AvatarImage
										src={
											user.photoURL
												? user.photoURL
												: '/images/default-avatar.png'
										}
										alt={`Avatar de ${user.displayName}`}
									/>
									<AvatarFallback>
										{String(user.displayName)
											.split(' ')
											.map(n => n[0])
											.slice(0, 2)
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>
										{user.displayName}
									</span>
									<span className='truncate text-xs'>{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Icon.sparkle />
								Faça o upgrade
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Icon.user />
								Meu perfil
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Icon.creditCard />
								Pagamentos
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Icon.gear />
								Configurações
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuItem onClick={logout}>
							<Icon.signOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
})
FooterAppSidebar.displayName = 'FooterAppSidebar'

export { FooterAppSidebar }
