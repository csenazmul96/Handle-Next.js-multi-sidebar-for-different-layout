import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import {GoChevronDown} from "react-icons/go";

export const Select = forwardRef(function Select({ className, multiple, ...props }, ref) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        'group relative block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[0px] before:bg-white before:shadow',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent after:has-[[data-focus]]:ring-2 after:has-[[data-focus]]:ring-blue-500',
        // Disabled state
        'has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none',
      ])}
    >
      <Headless.Select
        ref={ref}

        multiple={multiple}
        {...props}
        className={clsx([
            // Dynamically apply size based on props
          props.size === 'small' && 'h-[32px]',
          !props.size && 'h-[48px]',
          props.className,
          // Basic layout
          `relative block  py-[12px] px-[16px] placeholder-placeholderColor ${props.size === "small" ? "text-[13px] py-[3px]" : "text-[15px]"}  w-full appearance-none rounded-[0px]`,



          // Horizontal padding
          multiple
            ? 'px-[calc(theme(spacing[3.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)]'
            : `pl-[calc(theme(spacing[3.5])-1px)] sm:pl-[calc(theme(spacing.3)-1px)] ${props.size === 'small' ? 'pr-[25px]' : 'pr-[35px]'}`,
          // Options (multi-select)
          '[&_optgroup]:font-semibold',
          // Typography
          'text-textColor placeholder:text-placeholderColor  dark:text-white',
          // Border
          'border border-borderColor data-[hover]:border-borderColor dark:border-white/10 dark:data-[hover]:border-white/20',
          // Background color
          'bg-transparent dark:bg-white/5 dark:*:bg-zinc-800',
          // Hide default focus styles
          'focus:outline-none',
          // Invalid state
          'data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hover]:dark:border-red-600',
          // Disabled state
          'data-[disabled]:border-zinc-950/20 data-[disabled]:opacity-100 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]',
        ])}
      />
      {!multiple && (
        <span className={`pointer-events-none absolute inset-y-0 right-0 flex items-center ${props.size === 'small' ? 'pr-2' : 'pr-3'}`}>
          <GoChevronDown className={`${props.size === 'small' ? 'text-[16px]' : 'text-[24px]' }`}/>
        </span>
      )}
    </span>
  )
})
