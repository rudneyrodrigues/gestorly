import useSWR from 'swr'
import { User } from 'firebase/auth'

import { api } from '@/services/api'

export const useGetUser = () => {
	const fetcher = async (url: string) => {
		const response = (await api.get(url)).data

		if (response?.user) {
			return response.user as User
		}
	}

	const { data, error, isLoading, mutate } = useSWR(`/auth/me`, fetcher, {
		revalidateOnFocus: false,
		shouldRetryOnError: false
	})

	return {
		error,
		mutate,
		user: data,
		loading: isLoading
	}
}
