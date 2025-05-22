import useSWR from 'swr'

import { Company } from '@/types'
import { api } from '@/services/api'

export const useGetCompany = () => {
	const fetcher = async (url: string) => {
		const response = (await api.get(url)).data

		if (response?.company) {
			return response.company as Company
		}
	}

	const { data, error, isLoading, mutate } = useSWR(`/company`, fetcher, {
		revalidateOnFocus: false,
		shouldRetryOnError: false
	})

	return {
		error,
		mutate,
		company: data,
		loading: isLoading
	}
}
