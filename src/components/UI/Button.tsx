import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'subtle' | 'ghost';

type BaseProps = {
    variant?: ButtonVariant;
    className?: string;
};

type AnchorProps = BaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

type NativeButtonProps = BaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
        href?: undefined;
        type?: 'button' | 'submit' | 'reset';
    };

type ButtonProps = AnchorProps | NativeButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-ember-500 text-ink-950 hover:bg-ember-400 focus-visible:ring-ember-500',
    subtle: 'bg-ink-800 text-ink-100 border border-ink-700 hover:bg-ink-700 hover:border-ink-600 focus-visible:ring-ink-500',
    ghost: 'bg-transparent text-ink-300 hover:text-ink-50 hover:bg-ink-800 focus-visible:ring-ink-600',
};

const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:opacity-50';

function isAnchorProps(props: ButtonProps): props is AnchorProps {
    return typeof (props as AnchorProps).href === 'string';
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
    const classes = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

    if (isAnchorProps(props)) {
        return (
            <a className={classes} {...props}>
                {children}
            </a>
        );
    }

    const { type = 'button', ...buttonProps } = props as NativeButtonProps;

    return (
        <button type={type} className={classes} {...buttonProps}>
            {children}
        </button>
    );
}
