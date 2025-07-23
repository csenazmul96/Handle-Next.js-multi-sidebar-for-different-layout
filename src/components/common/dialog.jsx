import * as Headless from '@headlessui/react'
import clsx from 'clsx'

import { Text } from './text'

const sizes = {
  w370: 'max-w-[370px]',
  w500: 'max-w-[500px]',
  w800: 'max-w-[800px]',
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}

export function Dialog({ size = 'lg', className, children, ...props }) {
  return (
    <Headless.Dialog {...props}>
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 z-[71] flex w-screen justify-center overflow-y-auto bg-zinc-950/25 px-2 py-2 transition duration-100 focus:outline-0 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50"
      />

      <div className="fixed z-[71] inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
        <div className="min-h-full items-center justify-center flex flex-col sm:p-4">
          <Headless.DialogPanel
            transition
            className={clsx(
              className,
              sizes[size],
              'flex  p-8 justify-center self-center flex-col w-full min-w-0 bg-white  shadow-modalShadow ring-1 ring-zinc-950/10 [--gutter:theme(spacing.8)] sm:rounded-[0px] dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline',
              'transition duration-100 data-[closed]:translate-y-12 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:data-[closed]:translate-y-0 sm:data-[closed]:data-[enter]:scale-95'
            )}
          >
            {children}
          </Headless.DialogPanel>
        </div>
      </div>
    </Headless.Dialog>
  )
}

export function DialogTitle({ className, ...props }) {
  return (
    <Headless.DialogTitle
      {...props}
      className={clsx(className, 'text-medium font-bold text-black   border-b border-borderColor pb-4  dark:text-white')}
    />
  )
}

export function DialogDescription({ className, ...props }) {
  return <Headless.Description as={Text} {...props} className={clsx(className, 'mt-2 text-pretty')} />
}

export function DialogBody({ className, ...props }) {
  return <div {...props} className={clsx(className, 'mt-5 text-baseNormal font-normal text-textSubColor')} />
}

export function DialogActions({ className, ...props }) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'mt-7 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto'
      )}
    />
  )
}
