import { formatToDateTime } from 'brazilian-values'

export const formatDateTime = (value: string): string => {
	return formatToDateTime(new Date(value))
}
