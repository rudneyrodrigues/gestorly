import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
}

const DataTableColumnHeader = <TData, TValue>({
	column,
	title,
	className
}: DataTableColumnHeaderProps<TData, TValue>) => {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='sm'
						className='data-[state=open]:bg-accent -ml-3 h-8'
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<Icon.caretDown />
						) : column.getIsSorted() === 'asc' ? (
							<Icon.caretUp />
						) : (
							<Icon.caretUpDown />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<Icon.caretUp size={14} className='text-muted-foreground/70' />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<Icon.caretDown size={14} className='text-muted-foreground/70' />
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<Icon.eyeSlash size={14} className='text-muted-foreground/70' />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export { DataTableColumnHeader }
