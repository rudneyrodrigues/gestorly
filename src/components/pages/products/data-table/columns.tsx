import Link from 'next/link'
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
	// DropdownMenuLabel,
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
		),
		cell: ({ row }) => {
			const product = row.original
			return (
				<Link
					href={`/products/${product.id}`}
					className='font-medium hover:underline hover:underline-offset-4'
				>
					{product.name}
				</Link>
			)
		}
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
		accessorKey: 'showInCatalog',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Mostrar no Catálogo'
				className='block md:hidden xl:block'
			/>
		),
		cell: ({ row }) => {
			const showInCatalog = String(row.getValue('showInCatalog'))
			const formatted = showInCatalog === 'true' ? 'Sim' : 'Não'

			return (
				<div className='block font-medium md:hidden xl:block'>{formatted}</div>
			)
		}
	},
	{
		accessorKey: 'highlightInCatalog',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Destaque no Catálogo'
				className='block md:hidden xl:block'
			/>
		),
		cell: ({ row }) => {
			const showInCatalog = String(row.getValue('highlightInCatalog'))
			const formatted = showInCatalog === 'true' ? 'Sim' : 'Não'

			return (
				<div className='block font-medium md:hidden xl:block'>{formatted}</div>
			)
		}
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Atualizado em'
				className='block md:hidden lg:block'
			/>
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

			return (
				<div className='block font-medium md:hidden lg:block'>{formatted}</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const product = row.original

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
								onClick={() => navigator.clipboard.writeText(product.id)}
							>
								Copiar ID do produto
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={`/products/${product.id}`}>Ver detalhes</Link>
							</DropdownMenuItem>
							{/* <DropdownMenuItem>Deletar produto</DropdownMenuItem> */}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		}
	}
]
