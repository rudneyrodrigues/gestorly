import { ColumnDef } from '@tanstack/react-table'

import { Product } from '@/types'
import { Icon } from '@/components/ui/icon'
import { formatPrice } from '@/utils/format'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './column-header'
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Product>[] = [
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
			<DataTableColumnHeader column={column} title='Produto' />
		)
	},
	{
		accessorKey: 'stock',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Estoque' />
		)
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Preço' />
		),
		cell: ({ row }) => {
			const price = String(row.getValue('price'))
			const formatted = formatPrice(price)

			return <div className='font-medium'>{formatted}</div>
		}
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Atualizado em' />
		),
		cell: ({ row }) => {
			const updatedAt = String(row.getValue('updatedAt'))
			const formatted = new Date(updatedAt).toLocaleDateString('pt-BR', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit'
			})

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
							<Button variant='ghost' className='size-8 p-0'>
								<span className='sr-only'>Abrir menu</span>
								<Icon.more size={4} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(payment.id)}
							>
								Copiar ID do produto
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Ver detalhes</DropdownMenuItem>
							<DropdownMenuItem>Deletar produto</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		}
	}
]
