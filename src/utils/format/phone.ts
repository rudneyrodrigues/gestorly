import { formatToPhone } from 'brazilian-values'

export const formatPhone = (value: string): string => {
	const cleanedValue = value.replace(/\D/g, '')
	const formattedPhone = formatToPhone(cleanedValue)

	return formattedPhone
}
