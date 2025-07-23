import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import {ErrorMessage} from "@/components/common/fieldset";

export function InputGroup({ children }) {
  return (
    <span
      data-slot="control"
      className={clsx(
        'relative isolate block',
        '[&_input]:has-[[data-slot=icon]:first-child]:pl-10 [&_input]:has-[[data-slot=icon]:last-child]:pr-10 sm:[&_input]:has-[[data-slot=icon]:first-child]:pl-8 sm:[&_input]:has-[[data-slot=icon]:last-child]:pr-8',
        '[&>[data-slot=icon]]:pointer-events-none [&>[data-slot=icon]]:absolute [&>[data-slot=icon]]:top-3 [&>[data-slot=icon]]:z-10 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:top-2.5 sm:[&>[data-slot=icon]]:size-4',
        '[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5',
        '[&>[data-slot=icon]]:text-zinc-500 dark:[&>[data-slot=icon]]:text-zinc-400'
      )}
    >
      {children}
    </span>
  )
}

const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week']

export const Input = forwardRef(function Input(
  { className, ...props },

  ref
) {



  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        'relative focus:outline-0 ',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        // 'before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Focus ring
        // 'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500',
        // Disabled state
        'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none',
        // Invalid state
        // 'before:has-[[data-invalid]]:shadow-red-500/10',
      ])}
    >
      <Headless.Input
        ref={ref}
        autoComplete={'off'}
        {...props}
        className={clsx([
          // Date classes
            props.size === 'small' && 'h-[32px]',
            props.size === 'medium' && 'h-[42px]',
            !props.size && 'h-[48px]',
            props.className,
          props.type &&
            dateTypes.includes(props.type) && [
              '[&::-webkit-datetime-edit-fields-wrapper]:p-0',
              '[&::-webkit-date-and-time-value]:min-h-[1.5em]',
              '[&::-webkit-datetime-edit]:inline-flex',
              '[&::-webkit-datetime-edit]:p-0',
              '[&::-webkit-datetime-edit-year-field]:p-0',
              '[&::-webkit-datetime-edit-month-field]:p-0',
              '[&::-webkit-datetime-edit-day-field]:p-0',
              '[&::-webkit-datetime-edit-hour-field]:p-0',
              '[&::-webkit-datetime-edit-minute-field]:p-0',
              '[&::-webkit-datetime-edit-second-field]:p-0',
              '[&::-webkit-datetime-edit-millisecond-field]:p-0',
              '[&::-webkit-datetime-edit-meridiem-field]:p-0',
            ],
          // Basic layout
            `relative block h-[48px] py-[12px] px-[16px]  w-full appearance-none rounded-[0px] ${props.size === "small" ? "!h-[32px]" : ""} ${props.size === "medium" ? "!h-[42px]" : ""}`,
          // Typography
          'text-textColor placeholder:text-placeholderColor text-[15px] dark:text-white',
          // Border
          'border border-borderColor data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
          // Background color
          'bg-white dark:bg-white/5',
          // Hide default focus styles
          'focus:outline-none',
          // Invalid state
          'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500',
          // Disabled state
          'data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]',
          // System icons
          'dark:[color-scheme:dark]',
        ])}
      />
        {props.error &&
        <ErrorMessage>{props.error}</ErrorMessage>
        }
    </span>
  )
})
