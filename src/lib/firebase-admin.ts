import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'

import serviceAccount from '@/services/private-key-firebase.json'

const app = !getApps().length
	? initializeApp({
			credential: cert(serviceAccount as any)
		})
	: getApp()

const firestore = getFirestore(app)

export { app, firestore }
