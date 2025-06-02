import useSWR from 'swr'
import { parseCookies } from 'nookies'
import { listAll, ref, getDownloadURL } from 'firebase/storage'

import { storage } from '@/lib/firebase'

export const useGetImages = () => {
	const cookies = parseCookies()
	const userUid = cookies['@user.uid']

	const fetcher = async (url: string) => {
		const listRef = ref(storage, url)

		const response = await listAll(listRef)

		if (response.items) {
			const images = await Promise.all(
				response.items.map(async item => {
					const imageUrl = await getDownloadURL(item)
					return imageUrl
				})
			)

			return images
		}

		return []
	}

	const { data, error, isLoading, mutate } = useSWR(
		`/companies/${userUid}`,
		fetcher,
		{
			revalidateOnFocus: false,
			shouldRetryOnError: false
		}
	)

	return {
		error,
		mutate,
		images: data,
		loading: isLoading
	}
}
