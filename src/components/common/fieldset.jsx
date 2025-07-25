import * as Headless from '@headlessui/react'
import clsx from 'clsx'

export function Fieldset({ className, ...props }) {
  return (
    <Headless.Fieldset
      {...props}
      className={clsx(className, '[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1')}
    />
  )
}

export function Legend({ className, ...props }) {
  return (
    <Headless.Legend
      data-slot="legend"
      {...props}
      className={clsx(
        className,
        'text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white'
      )}
    />
  )
}

export function FieldGroup({ className, ...props }) {
  return <div data-slot="control" {...props} className={clsx(className, 'space-y-8')} />
}

export function Field({ className, ...props }) {
  return (
    <Headless.Field
      {...props}
      className={clsx(
        className,
        'pb-3',
        '[&>[data-slot=label]+[data-slot=control]]:mt-0 pb-4',
        '[&>[data-slot=label]+[data-slot=description]]:mt-1',
        '[&>[data-slot=description]+[data-slot=control]]:mt-3',
        '[&>[data-slot=control]+[data-slot=description]]:mt-3',
        '[&>[data-slot=control]+[data-slot=error]]:mt-3',
        '[&>[data-slot=label]]:font-medium'
      )}
    />
  )
}

export function Label({ className, ...props }) {
  return (
    <Headless.Label
      data-slot="label"
      {...props}
      className={clsx(
        className,
        'select-none text-textColor font-bold data-[disabled]:opacity-50 !text-[15px] dark:text-white'
      )}
    />
  )
}

export function Description({ className, ...props }) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={clsx(
        className,
        'text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400'
      )}
    />
  )
}

export function ErrorMessage({ className, ...props }) {
  return (
    <Headless.Description
      data-slot="error"
      {...props}
      className={clsx(className, 'text-base/6 text-dangerColor data-[disabled]:opacity-50 sm:text-[13px] dark:text-red-500')}
    />
  )
}
