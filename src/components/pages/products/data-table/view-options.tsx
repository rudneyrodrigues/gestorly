'use client'

import { Table } from '@tanstack/react-table'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import {
	DropdownMenu,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

const DataTableViewOptions = <TData,>({
	table
}: DataTableViewOptionsProps<TData>) => {
	const isMobile = useIsMobile()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className='ml-auto'
					size={isMobile ? 'icon' : 'default'}
				>
					<span className={cn('hidden', !isMobile && 'inline-flex')}>
						Configurações
					</span>
					<Icon.gear />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Alterar colunas</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						column =>
							typeof column.accessorFn !== 'undefined' && column.getCanHide()
					)
					.map(column => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='truncate capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={value => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { DataTableViewOptions }
