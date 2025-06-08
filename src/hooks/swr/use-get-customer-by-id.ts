import useSWR from 'swr'

import { Customer } from '@/types'
import { api } from '@/services/api'

export const useGetCustomerById = (id: string) => {
	const fetcher = async (url: string) => {
		const response = (await api.get(url)).data

		if (response?.customer) {
			return response.customer as Customer
		}
	}

	const { data, error, isLoading, mutate } = useSWR(
		`/customers/${id}`,
		fetcher,
		{
			revalidateOnFocus: false,
			shouldRetryOnError: false
		}
	)

	return {
		error,
		mutate,
		customer: data,
		loading: isLoading
	}
}
