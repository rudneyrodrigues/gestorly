// import Link from 'next/link'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'

import { Customer } from '@/types'
import { Icon } from '@/components/ui/icon'
import { ImageDialog } from '@/components/app'
// import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './column-header'
import { formatPhone, formatCpfOrCnpj } from '@/utils/format'
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
		accessorKey: 'avatar',
		header: () => <span className='md:hidden xl:block'>Avatar</span>,
		cell: ({ row }) => {
			const customer = row.original

			if (!customer.avatar) {
				return (
					<div className='bg-muted flex size-8 cursor-pointer items-center justify-center rounded-full'>
						<Icon.user className='text-muted-foreground size-4' />
					</div>
				)
			}

			return (
				<ImageDialog
					className='size-8 cursor-pointer rounded-full md:hidden xl:block'
					imageUrl={customer.avatar}
				>
					<Image
						width={32}
						height={32}
						loading='lazy'
						quality={100}
						src={customer.avatar}
						alt={`Avatar de ${customer.name}`}
						className='h-full w-full'
					/>
				</ImageDialog>
			)
		}
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
			<DataTableColumnHeader
				column={column}
				title='Telefone'
				className='md:hidden xl:block'
			/>
		),
		cell: ({ row }) => {
			const customer = row.original

			return (
				<span suppressHydrationWarning className='truncate md:hidden xl:block'>
					{formatPhone(String(customer.phone))}
				</span>
			)
		}
	},
	{
		accessorKey: 'cpf_or_cnpj',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='CPF/CNPJ'
				className='md:hidden xl:block'
			/>
		),
		cell: ({ row }) => {
			const customer = row.original

			return (
				<span suppressHydrationWarning className='truncate md:hidden xl:block'>
					{formatCpfOrCnpj(String(customer.cpf_or_cnpj))}
				</span>
			)
		}
	}
]
