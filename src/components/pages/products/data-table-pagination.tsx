import { Table } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import {
	Select,
	SelectItem,
	SelectValue,
	SelectTrigger,
	SelectContent
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

const DataTablePagination = <TData,>({
	table
}: DataTablePaginationProps<TData>) => {
	const isMobile = useIsMobile()

	return (
		<div
			className={cn(
				'flex w-full flex-col items-center justify-between gap-4',
				!isMobile && 'flex-row'
			)}
		>
			<div className='text-muted-foreground flex-1 text-sm'>
				{table.getFilteredSelectedRowModel().rows.length} of{' '}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>

			<div
				className={cn(
					'flex w-full flex-col items-center gap-4',
					!isMobile && 'w-auto flex-row'
				)}
			>
				<div
					className={cn(
						'flex w-full items-center justify-between gap-2',
						!isMobile && 'w-auto'
					)}
				>
					<p className='text-sm font-medium'>Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div
					className={cn(
						'flex w-full items-center justify-start text-sm font-medium',
						!isMobile && 'w-auto justify-center'
					)}
				>
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</div>

				<div
					className={cn(
						'flex w-full items-center justify-between gap-2',
						!isMobile && 'w-auto'
					)}
				>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to first page</span>
						<Icon.caretDoubleLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to previous page</span>
						<Icon.caretLeft />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to next page</span>
						<Icon.caretRight />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to last page</span>
						<Icon.caretDoubleRight />
					</Button>
				</div>
			</div>
		</div>
	)
}

export { DataTablePagination }
