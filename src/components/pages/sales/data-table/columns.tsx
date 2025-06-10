import Link from 'next/link'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'

import { Sale } from '@/types'
import { Icon } from '@/components/ui/icon'
import { formatDate } from '@/utils/format'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './column-header'
import {
	DropdownMenu,
	DropdownMenuItem,
	// DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Sale>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
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
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='ID da venda'
				className='block md:hidden lg:block'
			/>
		),
		cell: ({ row }) => {
			const sale = row.original

			return (
				<Link
					key={sale.id}
					href={`/sales/${sale.id}`}
					suppressHydrationWarning
					className='block truncate font-medium hover:underline hover:underline-offset-4 md:hidden lg:block'
				>
					{sale.id}
				</Link>
			)
		}
	},
	{
		accessorKey: 'product',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Produto' />
		),
		cell: ({ row }) => {
			const sale = row.original

			return <span className='truncate'>{sale.product}</span>
		}
	},
	{
		accessorKey: 'customer',
		header: ({ column }) => (
			<DataTableColumnHeader
				title='Nome'
				column={column}
				className='block md:hidden lg:block'
			/>
		),
		cell: ({ row }) => {
			const sale = row.original

			return (
				<span className='block truncate md:hidden lg:block'>
					{sale.customer}
				</span>
			)
		}
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Quantidade' />
		),
		cell: ({ row }) => {
			const sale = row.original

			return <span className='truncate'>{sale.quantity}</span>
		}
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<DataTableColumnHeader
				title='Data'
				column={column}
				className='block md:hidden lg:block'
			/>
		),
		cell: ({ row }) => {
			const sale = row.original

			return (
				<span className='block truncate md:hidden lg:block'>
					{formatDate(sale.date)}
				</span>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const sale = row.original

			return (
				<div className='flex items-center justify-end'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='size-8 p-0'>
								<span className='sr-only'>Abrir menu</span>
								<Icon.more size={4} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{/* <DropdownMenuLabel>Ações</DropdownMenuLabel> */}
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(sale.id)}
							>
								Copiar ID da venda
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/sales/${sale.id}`}>Ver detalhes</Link>
							</DropdownMenuItem>
							{/* <DropdownMenuItem>Deletar cliente</DropdownMenuItem> */}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		}
	}
]
