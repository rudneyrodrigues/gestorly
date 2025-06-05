// import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

import { Customer } from '@/types'
// import { Icon } from '@/components/ui/icon'
import { formatPhone, formatCpfOrCnpj } from '@/utils/format'
// import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './column-header'
// import {
// 	DropdownMenu,
// 	DropdownMenuItem,
// 	// DropdownMenuLabel,
// 	DropdownMenuContent,
// 	DropdownMenuTrigger,
// 	DropdownMenuSeparator
// } from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Customer>[] = [
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
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Nome' />
		),
		cell: ({ row }) => {
			const customer = row.original

			return (
				<span suppressHydrationWarning className='truncate'>
					{customer.name}
				</span>
			)
		}
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
		cell: ({ row }) => {
			const customer = row.original

			return (
				<span suppressHydrationWarning className='truncate'>
					{customer.email}
				</span>
			)
		}
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Telefone' />
		),
		cell: ({ row }) => {
			const customer = row.original

			return (
				<span suppressHydrationWarning className='truncate'>
					{formatPhone(String(customer.phone))}
				</span>
			)
		}
	},
	{
		accessorKey: 'cpf_or_cnpj',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='CPF/CNPJ' />
		),
		cell: ({ row }) => {
			const customer = row.original

			return (
				<span suppressHydrationWarning className='truncate'>
					{formatCpfOrCnpj(String(customer.cpf_or_cnpj))}
				</span>
			)
		}
	}
]
