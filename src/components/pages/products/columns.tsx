import { ColumnDef } from '@tanstack/react-table'

import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

// Este tipo é usado para definir o formato dos nossos dados.
// Você pode usar um esquema Zod aqui, se desejar.
export type Payment = {
	id: string
	amount: number
	status: 'pending' | 'processing' | 'success' | 'failed'
	email: string
}

export const columns: ColumnDef<Payment>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Status' />
		)
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		)
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Actions' />
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original

			return (
				<div className='flex items-center justify-end'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='ml-auto size-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<Icon.more size={4} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(payment.id)}
							>
								Copy payment ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		}
	}
]
