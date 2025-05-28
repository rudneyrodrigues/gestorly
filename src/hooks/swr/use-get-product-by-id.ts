import useSWR from 'swr'

import { Product } from '@/types'
import { api } from '@/services/api'

export const useGetProductById = (id: string) => {
	const fetcher = async (url: string) => {
		const response = (await api.get(url)).data

		if (response?.product) {
			return response.product as Product
		}
	}

	const { data, error, isLoading, mutate } = useSWR(
		`/products/${id}`,
		fetcher,
		{
			revalidateOnFocus: false,
			shouldRetryOnError: false
		}
	)

	return {
		error,
		mutate,
		product: data,
		loading: isLoading
	}
}
