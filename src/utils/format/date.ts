import { formatToDate } from 'brazilian-values'

export const formatDate = (value: string): string => {
	return formatToDate(new Date(value))
}
