import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { destroyCookie, setCookie } from 'nookies'
import { createContext, ReactNode, useState, useEffect } from 'react'
import {
	User,
	signOut,
	updateProfile,
	signInWithPopup,
	onAuthStateChanged,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword
} from 'firebase/auth'

import { auth } from '@/lib/firebase'

interface AuthProviderProps {
	children: ReactNode
}

export interface AuthContextData {
	user: User
	loading: boolean
	logout: () => Promise<void>
	loginWithGoogle: () => Promise<void>
	forgotPassword: (email: string) => Promise<void>
	loginWithEmailAndPassword: (email: string, password: string) => Promise<void>
	registerWithEmailAndPassword: (
		name: string,
		email: string,
		password: string
	) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
	const THREE_HOURS_IN_SECONDS = 60 * 60 * 3

	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState<User>({} as User)

	const loginWithGoogle = async () => {
		setLoading(true)

		const provider = new GoogleAuthProvider()

		await signInWithPopup(auth, provider)
			.then(async ({ user }) => {
				if (!user) {
					throw new Error('User not found')
				}

				setCookie(null, '@user.uid', user.uid, {
					path: '/',
					maxAge: THREE_HOURS_IN_SECONDS,
					secure: process.env.NODE_ENV === 'production'
				})
				setUser(user)

				router.push('/')
			})
			.catch(error => {
				console.error('Error signing in with Google:', error)
				throw new Error('Error signing in with Google')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const loginWithEmailAndPassword = async (email: string, password: string) => {
		setLoading(true)

		await signInWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				if (!user) {
					throw new Error('User not found')
				}

				setCookie(null, '@user.uid', user.uid, {
					path: '/',
					maxAge: THREE_HOURS_IN_SECONDS,
					secure: process.env.NODE_ENV === 'production'
				})
				setUser(user)

				router.push('/')
			})
			.catch(error => {
				console.error('Error signing in with email and password:', error)

				throw new Error('Error signing in with email and password')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const registerWithEmailAndPassword = async (
		name: string,
		email: string,
		password: string
	) => {
		setLoading(true)

		await createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				if (!user) {
					throw new Error('User not found')
				}

				await updateProfile(user, { displayName: name })

				setCookie(null, '@user.uid', user.uid, {
					path: '/',
					maxAge: THREE_HOURS_IN_SECONDS,
					secure: process.env.NODE_ENV === 'production'
				})
				setUser(user)

				router.push('/')
			})
			.catch(error => {
				console.error('Error signing up with email and password:', error)
				throw new Error('Error signing up with email and password')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const forgotPassword = async (email: string) => {
		await sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.success('E-mail de recuperação enviado com sucesso!', {
					description: 'Verifique sua caixa de entrada ou pasta de spam.',
					action: {
						label: 'Ok',
						onClick: () => {}
					}
				})
			})
			.catch(error => {
				console.error('Error sending password reset email:', error)
				throw new Error('Error sending password reset email')
			})
	}

	const logout = async () => {
		setLoading(true)

		await signOut(auth)
			.then(() => {
				toast.success('Até logo!', {
					description: 'Você foi desconectado com sucesso.'
				})
			})
			.catch(error => {
				console.error('Error signing out:', error)
				throw new Error('Error signing out')
			})
			.finally(() => {
				setUser({} as User)
				setLoading(false)
				destroyCookie(null, '@user.uid', { path: '/' })

				router.push('/sign-in')
			})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				setUser(user)
				setCookie(null, '@user.uid', user.uid, {
					path: '/',
					maxAge: THREE_HOURS_IN_SECONDS,
					secure: process.env.NODE_ENV === 'production'
				})
			} else {
				setUser({} as User)
				destroyCookie(null, '@user.uid', { path: '/' })
			}
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				logout,
				loading,
				forgotPassword,
				loginWithGoogle,
				loginWithEmailAndPassword,
				registerWithEmailAndPassword
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
