import { formatToCPF, formatToCNPJ } from 'brazilian-values'

export const formatCpfOrCnpj = (value: string): string => {
	const cleanedValue = value.replace(/\D/g, '')
	const length = cleanedValue.length

	if (length <= 11) {
		return formatToCPF(cleanedValue)
	} else if (length <= 14) {
		return formatToCNPJ(cleanedValue)
	}

	return cleanedValue
}
