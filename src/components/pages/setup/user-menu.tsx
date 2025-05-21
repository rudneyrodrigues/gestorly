import { memo, type FC, type JSX } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

const UserMenu: FC = memo((): JSX.Element => {
	const { user, logout } = useAuth()

	if (!user) return <Skeleton className='size-9 rounded-full' />

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='rounded-full'>
				<Avatar>
					<AvatarImage
						src={user.photoURL ? user.photoURL : '/images/default-avatar.png'}
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
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' className='w-52'>
				<DropdownMenuLabel>Minha conta</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem>Meu perfil</DropdownMenuItem>
					{/* <DropdownMenuItem>Pagamentos</DropdownMenuItem> */}
					<DropdownMenuItem>Configurações</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem>Suporte</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
})
UserMenu.displayName = 'UserMenu'

export { UserMenu }
