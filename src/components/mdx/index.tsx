import { cn } from '../../lib/utils'

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-blue-700/30 bg-blue-1000/[0.03] px-4 py-3 my-4 rounded-r-sm text-sm leading-relaxed">
      {children}
    </div>
  )
}

export function Link({
  href,
  className,
  children,
  alt,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { alt?: string }) {
  return (
    <a
      href={href}
      className={cn(
        'underline underline-offset-2 decoration-muted-foreground/30 hover:decoration-foreground transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export function MDXIcon({
  icon: Icon,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  className?: string
}) {
  return <Icon className={className} />
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('rounded-sm w-full my-4', className)}
    />
  )
}

export const mdxComponents = {
  Callout,
  Link,
  MDXIcon,
  Image,
}
