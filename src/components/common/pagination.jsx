import clsx from 'clsx'

import { Button } from './button'

export function Pagination({ 'aria-label': ariaLabel = 'Page navigation', className, ...props }) {
  return <nav aria-label={ariaLabel} {...props} className={clsx(className, 'flex gap-x-2')} />
}

export function PaginationPrevious({ href = null, className, children = 'Previous', clickEvent, disable= false }) {
  return (
    <span className={clsx(className, 'flex grow basis-0')} onClick={clickEvent}>
      <Button plain aria-label="Previous page" className={'cursor-pointer'} disable={disable}>
        {children}
      </Button>
    </span>
  )
}

export function PaginationNext({ href = null, className, children = 'Next', clickEvent, disable = false }) {
  return (
    <span className={clsx(className, 'flex grow basis-0 justify-end !cursor-pointer') } onClick={clickEvent}>
      <Button  plain aria-label="Next page" className={'cursor-pointer'} disable={disable}>
        {children}
      </Button>
    </span>
  )
}

export function PaginationList({ className, ...props }) {
  return <span {...props} className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')} />
}

export function PaginationPage({ href, className, current = false, children }) {
  return (
    <Button
      href={href}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      className={clsx(
        className,
        'min-w-[2.25rem] text-[#555555] before:absolute before:-inset-px before:rounded-[0] size-[40px]',
        current && 'before:bg-themeColor  text-white dark:before:bg-white/10'
      )}
    >
      <span className="-mx-0.5 z-10">{children}</span>
    </Button>
  )
}

export function PaginationGap({ className, children = <>&hellip;</>, ...props }) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        'w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white'
      )}
    >
      {children}
    </span>
  )
}
