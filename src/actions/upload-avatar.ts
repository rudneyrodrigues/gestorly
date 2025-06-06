import { parseCookies } from 'nookies'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '@/lib/firebase'

type IUploadAvatar = {
	email: string
	avatarFile: File
}

export const uploadAvatar = async ({ email, avatarFile }: IUploadAvatar) => {
	const cookies = parseCookies()
	const companyId = cookies['@user.uid']

	const metadata = {
		contentType: avatarFile.type
	}

	const avatarRef = ref(storage, `customers/${companyId}/${email}`)

	await uploadBytes(avatarRef, avatarFile, metadata)

	const avatarUrl = await getDownloadURL(avatarRef)

	return avatarUrl
}
