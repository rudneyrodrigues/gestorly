import { formatToNumber } from 'brazilian-values'

export const formatNumber = (value: string): string => {
	const formattedValue = value.replace(/\D/g, '') // Remove all non-digit characters
	const numericValue = parseInt(formattedValue, 10) // Convert to a number
	if (isNaN(numericValue)) {
		return ''
	}
	// Format the numeric value to a number format
	const formattedNumber = formatToNumber(numericValue)
	return formattedNumber
}
