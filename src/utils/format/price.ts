import { formatToBRL } from 'brazilian-values'

export const formatPrice = (value: string): string => {
	const formattedValue = value.replace(/\D/g, '') // Remove all non-digit characters
	const numericValue = parseFloat(formattedValue) / 100 // Convert to a number and divide by 100 to get the correct value in BRL
	if (isNaN(numericValue)) {
		return ''
	}
	// Format the numeric value to BRL currency format
	const formattedPrice = formatToBRL(numericValue)

	return formattedPrice
}
