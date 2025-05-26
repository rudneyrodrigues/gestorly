import useSWR from 'swr'

import { Product } from '@/types'
import { api } from '@/services/api'

export const useGetProducts = () => {
	const fetcher = async (url: string) => {
		const response = (await api.get(url)).data

		if (response?.products) {
			return response.products as Product[]
		}
	}

	const { data, error, isLoading, mutate } = useSWR(`/products`, fetcher, {
		revalidateOnFocus: false,
		shouldRetryOnError: false
	})

	return {
		error,
		mutate,
		products: data,
		loading: isLoading
	}
}
