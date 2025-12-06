import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'subtle' | 'ghost'

type BaseProps = {
	variant?: ButtonVariant
	className?: string
}

type AnchorProps = BaseProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		href: string
	}

type NativeButtonProps = BaseProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
		href?: undefined
		type?: 'button' | 'submit' | 'reset'
	}

type ButtonProps = AnchorProps | NativeButtonProps

const variantStyles: Record<ButtonVariant, string> = {
	primary: 'bg-slate-50 text-slate-900 hover:bg-slate-200 focus-visible:outline-slate-200',
	subtle: 'bg-slate-800 text-slate-50 hover:bg-slate-700 focus-visible:outline-slate-500',
	ghost: 'bg-transparent text-slate-200 hover:text-white focus-visible:outline-slate-600',
}

const baseStyles =
	'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

function isAnchorProps(props: ButtonProps): props is AnchorProps {
	return typeof (props as AnchorProps).href === 'string'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
	const classes = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

	if (isAnchorProps(props)) {
		const { ...anchorProps } = props
		return (
			<a className={classes} {...anchorProps}>
				{children}
			</a>
		)
	}

	const nativeProps = props as NativeButtonProps
	const { type = 'button', ...buttonProps } = nativeProps

	return (
		<button type={type} className={classes} {...buttonProps}>
			{children}
		</button>
	)
}
