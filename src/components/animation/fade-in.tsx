import { JSX } from 'react'
import {
	Target,
	motion,
	HTMLMotionProps,
	useReducedMotion,
	ForwardRefComponent
} from 'framer-motion'

type Without<T, K> = Pick<T, Exclude<keyof T, K>>

interface FadeInProps extends HTMLMotionProps<'div'> {
	exit?: Target
	delay?: number
	value?: number
	initial?: Target
	animate?: Target
	duration?: number
	children: React.ReactNode
	startOnScrollIntersect?: boolean
	to?: 'left' | 'right' | 'top' | 'bottom'
	as?: Without<keyof JSX.IntrinsicElements, 'template' | 'slot'>
}

export function FadeIn({
	exit,
	initial,
	animate,
	children,
	delay = 0,
	as = 'div',
	value = 20,
	to = 'right',
	duration = 0.2,
	startOnScrollIntersect = false,
	...props
}: FadeInProps) {
	const shouldReduceMotion = useReducedMotion()

	const animation = {
		left: {
			direction: 'x',
			value: value
		},
		right: {
			direction: 'x',
			value: value * -1
		},
		top: {
			direction: 'y',
			value: value
		},
		bottom: {
			direction: 'y',
			value: value * -1
		}
	}[to]

	// @ts-expect-error: TypeScript does not recognize 'as' as a valid key for motion components
	const Component = motion[as] as ForwardRefComponent<
		HTMLDivElement,
		HTMLMotionProps<'div'>
	>

	const defaultStyles = {
		opacity: shouldReduceMotion ? 1 : 0,
		[animation.direction]: shouldReduceMotion ? 0 : animation.value
	}
	const animationStyles = { opacity: 1, [animation.direction]: 0, ...animate }

	return (
		<Component
			initial={{ ...defaultStyles, ...initial }}
			animate={startOnScrollIntersect ? undefined : animationStyles}
			whileInView={startOnScrollIntersect ? animationStyles : undefined}
			exit={startOnScrollIntersect ? undefined : { ...defaultStyles, ...exit }}
			transition={{ delay, duration }}
			viewport={{
				once: startOnScrollIntersect
			}}
			{...props}
		>
			{children}
		</Component>
	)
}
