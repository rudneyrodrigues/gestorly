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

import { Input } from '@/components/ui/input'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from './data-table-view-options'
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

	return (
		<div className='w-full space-y-4'>
			<div className='flex items-center gap-2'>
				<Input
					placeholder='Filter emails...'
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('email')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>

				<div className='flex items-center justify-end gap-2'>
					<DataTableViewOptions table={table} />
				</div>
			</div>

			<div className='rounded-md border'>
				<Table>
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
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination table={table} />
		</div>
	)
}
DataTable.displayName = 'DataTable'

export { DataTable }
