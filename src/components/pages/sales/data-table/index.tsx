import { toast } from 'sonner'
import * as React from 'react'
import {
	ColumnDef,
	flexRender,
	SortingState,
	useReactTable,
	getCoreRowModel,
	VisibilityState,
	getSortedRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
	getPaginationRowModel
} from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { DataTablePagination } from './pagination'
import { DataTableViewOptions } from './view-options'
import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableHeader
} from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

const DataTable = <TData, TValue>({
	columns,
	data
}: DataTableProps<TData, TValue>) => {
	const isMobile = useIsMobile()
	const [rowSelection, setRowSelection] = React.useState({})
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			rowSelection,
			columnFilters,
			columnVisibility
		}
	})

	const updateTableData = React.useCallback(async () => {
		// await mutate()

		toast.success('Dados atualizados com sucesso!')
	}, [])

	return (
		<div className='w-full space-y-4'>
			<div className='flex items-center gap-2 p-2'>
				<Input
					type='search'
					placeholder='Filtrar por ID'
					value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('id')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>

				<div className='flex items-center justify-end gap-2'>
					<Button
						// loading={loading}
						variant='outline'
						onClick={updateTableData}
						size={isMobile ? 'icon' : 'default'}
					>
						<span className={cn('hidden', !isMobile && 'block')}>
							Atualizar
						</span>
						{isMobile && <Icon.loading />}
					</Button>
					<DataTableViewOptions table={table} />
				</div>
			</div>

			<Table className='w-full overflow-x-auto'>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id} className='max-w-[150px] truncate'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								Nenhum dado encontrado.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<DataTablePagination table={table} />
		</div>
	)
}

export { DataTable }
export * from './columns'
