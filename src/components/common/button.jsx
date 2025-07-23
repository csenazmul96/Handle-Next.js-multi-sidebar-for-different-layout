import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { Link } from './link'
import { faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const styles = {
    base: [
        // Base
        'relative isolate inline-flex items-center justify-center gap-x-1  font-normal ',
        // Sizing
        // 'px-[20px] py-[5px]  md:text-[19px] ',
        // Focus
        // 'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
        // Disabled
        'data-[disabled]:opacity-50',
        // Icon
        // '[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText]',
    ],
    solid: [
        // Optical border, implemented as the button background to avoid corner artifacts
        // 'border-transparent bg-[--btn-border]',
        // // Dark mode: border is rendered on `after` so background is set to button background
        // 'dark:bg-[--btn-bg]',
        // // Button background, implemented as foreground layer to stack on top of pseudo-border layer
        // 'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]',
        // // Drop shadow, applied to the inset `before` layer so it blends with the border
        // 'before:shadow',
        // // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        // 'dark:before:hidden',
        // // Dark mode: Subtle white outline is applied using a border
        // 'dark:border-white/5',
        // // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
        // 'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]',
        // // Inner highlight shadow
        // 'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]',
        // // White overlay on hover
        // 'after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]',
        // // Dark mode: `after` layer expands to cover entire button
        // 'dark:after:-inset-px dark:after:rounded-lg',
        // // Disabled
        // 'before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none',
    ],
    outline: [
        // Base
        'border-zinc-950/10 text-zinc-950 data-[active]:bg-zinc-950/[2.5%] data-[hover]:bg-zinc-950/[2.5%]',
        // Dark mode
        'dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-[active]:bg-white/5 dark:data-[hover]:bg-white/5',
        // Icon
        '[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
    ],
    plain: [
        // Base
        'border-transparent text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5',
        // Dark mode
        'dark:text-white dark:data-[active]:bg-white/10 dark:data-[hover]:bg-white/10',
        // Icon
        '[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
    ],
    colors: {
        // 'dark/zinc': [
        //   'text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]',
        //   'dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)]',
        //   '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]',
        // ],

        primary: [
            'bg-themeColor border border-themeColor rounded-[0]  !gap-2.5 text-white  font-normal min-w-[190px] px-4 h-[48px]  md:text-[19px] cursor-pointer',
        ],
        primaryLarge: [
            'bg-themeColor border border-themeColor rounded-[0]  text-white text-[17px] h-[40px] px-4 text-textSubColor leading-40 cursor-pointer',
        ],
        primaryLightLarge: [
            'bg-primaryLightColor border border-primaryLightColor rounded-[0]   text-themeColor text-[17px] h-[40px] px-4 text-textSubColor leading-40 cursor-pointer',
        ],
        primaryMedium: [
            'bg-themeColor border border-themeColor rounded-[0]  text-white text-[17px] h-[32px] px-4 text-textSubColor leading-32 cursor-pointer',
        ],
        primaryLightMedium: [
            'bg-primaryLightColor border border-primaryLightColor rounded-[0]   text-themeColor text-[17px] h-[32px] px-4 text-textSubColor leading-32 cursor-pointer',
        ],
        primarySmall: [
            'bg-themeColor rounded-[2px] border border-themeColor text-white   py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        primaryBorderRoundedSmall: [
            'bg-themeColor rounded-[2px] border border-themeColor rounded-[16px]   text-white  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        primaryNoBgSmall: [
            'bg-transparent border border border-themeColor text-themeColor   py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],


        primaryLight: [
            'bg-primaryLightColor border border-primaryLightColor rounded-[0]  !gap-2.5 text-themeColor  font-normal min-w-[190px] px-4 h-[48px]  md:text-[19px] cursor-pointer',
        ],
        primaryLightSmall: [
            'bg-primaryLightColor rounded-[2px] border border-primaryLightColor rounded-[0]   text-themeColor  py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        primaryRoundedSmall: [
            'bg-themeColor border border-themeColor text-white rounded-[16px]   py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        primaryNoBgRoundedSmall: [
            'gap-x-1 bg-transparent border border-themeColor text-themeColor rounded-[16px]   py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        primaryLightRoundedSmall: [
            'bg-primaryLightColor border border-primaryLightColor rounded-[16px]   text-themeColor  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        primaryLightBorderRoundedSmall: [
            'bg-primaryLightColor rounded-[2px] border border-primaryLightColor rounded-[16px]   text-themeColor  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],


        secondary: [
            'bg-secondaryColor border border-secondaryColor rounded-[0] !gap-2.5  text-white  font-normal min-w-[190px] px-4 h-[48px]  md:text-[19px] cursor-pointer',
        ],
        secondaryLarge: [
            'bg-secondaryColor border border-secondaryColor  rounded-[0] text-white text-[17px] h-[40px] px-4  leading-40 cursor-pointer',
        ],
        secondaryMedium: [
            'bg-secondaryColor border border-secondaryColor  rounded-[0] text-white text-[17px] h-[32px] px-4  leading-32 cursor-pointer',
        ],
        secondaryLightMedium: [
            'bg-secondaryLightColor border border-secondaryLightColor text-textSubColor rounded-[0]  text-[17px] h-[32px] px-4  leading-32 cursor-pointer',
        ],
        secondaryRoundedSmall: [
            'bg-secondaryColor border border-secondaryColor text-white rounded-[16px]   py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer ',
        ],
        secondaryBorderRoundedSmall: [
            'bg-secondaryColor border rounded-[2px] border-secondaryColor text-white rounded-[16px]  py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer ',
        ],
        secondarySmall: [
            'bg-secondaryColor rounded-[2px] border border-secondaryColor text-white py-[0px]  text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer ',
        ],

        secondaryLightRoundedSmall: [
            'bg-secondaryLightColor border border-secondaryLightColor text-textSubColor rounded-[16px] py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer ',
        ],
        secondaryLightSmall: [
            'bg-secondaryLightColor rounded-[2px] border border-secondaryLightColor text-textSubColor py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer ',
        ],
        secondaryLightBorderRoundedSmall: [
            'bg-secondaryLightColor border rounded-[2px] border-secondaryLightColor text-textSubColor py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer ',
        ],



        warningRoundedSmall: [
            'bg-warningBgColor border border-warningBgColor text-warningColor rounded-[16px]  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],


        danger: [
            'bg-dangerColor border border-dangerColor rounded-[0] !gap-2.5  text-white  font-normal min-w-[190px] px-4 h-[48px]  md:text-[19px] cursor-pointer ',
        ],
        dangerLarge: [
            'bg-dangerColor border border-dangerColor rounded-[0] text-white text-[17px] h-[40px] px-4 leading-40 cursor-pointer',
        ],
        dangerMedium: [
            'bg-dangerColor border border-dangerColor rounded-[0] text-white text-[17px] h-[32px] px-4 leading-32 cursor-pointer',
        ],
        dangerLightMedium: [
            'bg-dangerLightColor border border-dangerLightColor text-dangerDeppColor rounded-[0] text-[17px] h-[32px] px-4 leading-32 cursor-pointer',
        ],
        dangerRoundedSmall: [
            'bg-dangerColor border border-dangerColor text-white rounded-[16px]  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        dangerLightRoundedSmall: [
            'bg-dangerLightColor border border-dangerLightColor text-dangerDeppColor rounded-[16px]  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        dangerSmall: [
            'bg-dangerColor rounded-[2px] border border-dangerColor text-white py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        dangerLightSmall: [
            'bg-dangerLightColor rounded-[2px] border border-dangerLightColor  text-dangerDeppColor py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        dangerLightBorderRoundedSmall: [
            'bg-dangerLightColor rounded-[2px] border border-dangerLightColor  text-dangerDeppColor py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],


        transparent: [
            'bg-transparent border border-borderColor rounded-[0] !gap-2.5 min-w-[190px] px-4 h-[48px]  text-textSubColor  md:text-[19px] cursor-pointer',
        ],
        transparentRoundedMedium: [
            'bg-transparent border border-borderColor rounded-[16px]  text-[17px] h-[32px] px-4 text-textSubColor leading-32 cursor-pointer',
        ],
        transparentLarge: [
            'bg-transparent border border-borderColor rounded-[0]  text-[17px] h-[40px] px-4 text-textSubColor leading-40 cursor-pointer',
        ],
        transparentMedium: [
            'bg-transparent border border-borderColor rounded-[0]  text-[17px] h-[32px] px-4 text-textSubColor leading-32 cursor-pointer',
        ],
        transparentRoundedSmall: [
            'bg-transparent border border-borderColor rounded-[16px]   text-textSubColor  py-[0px] text-[13px] px-3 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        transparentSmall: [
            'bg-transparent rounded-[2px] border border-borderColor text-textSubColor py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],
        transparentBorderRoundedSmall: [
            'bg-transparent rounded-[2px] border border-borderColor text-textSubColor py-[0px] text-[13px] px-2 font-normal min-w-[auto] h-[24px] leading-19 cursor-pointer',
        ],



        light: [
            'text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]',
            'dark:text-white dark:[--btn-hover-overlay:theme(colors.white/5%)] dark:[--btn-bg:theme(colors.zinc.800)]',
            '[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
        ],
        'dark/white': [
            'text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]',
            'dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]',
            '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
        ],
        dark: [
            'text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]',
            'dark:[--btn-hover-overlay:theme(colors.white/5%)] dark:[--btn-bg:theme(colors.zinc.800)]',
            '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]',
        ],
        white: [
            'text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]',
            'dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]',
            '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.500)] data-[hover]:[--btn-icon:theme(colors.zinc.500)]',
        ],
        zinc: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.zinc.600)] [--btn-border:theme(colors.zinc.700/90%)]',
            'dark:[--btn-hover-overlay:theme(colors.white/5%)]',
            '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]',
        ],
        indigo: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]',
            '[--btn-icon:theme(colors.indigo.300)] data-[active]:[--btn-icon:theme(colors.indigo.200)] data-[hover]:[--btn-icon:theme(colors.indigo.200)]',
        ],
        cyan: [
            'text-cyan-950 [--btn-bg:theme(colors.cyan.300)] [--btn-border:theme(colors.cyan.400/80%)] [--btn-hover-overlay:theme(colors.white/25%)]',
            '[--btn-icon:theme(colors.cyan.500)]',
        ],
        red: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]',
            '[--btn-icon:theme(colors.red.300)] data-[active]:[--btn-icon:theme(colors.red.200)] data-[hover]:[--btn-icon:theme(colors.red.200)]',
        ],
        orange: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.orange.500)] [--btn-border:theme(colors.orange.600/90%)]',
            '[--btn-icon:theme(colors.orange.300)] data-[active]:[--btn-icon:theme(colors.orange.200)] data-[hover]:[--btn-icon:theme(colors.orange.200)]',
        ],
        amber: [
            'text-amber-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.amber.400)] [--btn-border:theme(colors.amber.500/80%)]',
            '[--btn-icon:theme(colors.amber.600)]',
        ],
        yellow: [
            'text-yellow-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.yellow.300)] [--btn-border:theme(colors.yellow.400/80%)]',
            '[--btn-icon:theme(colors.yellow.600)] data-[active]:[--btn-icon:theme(colors.yellow.700)] data-[hover]:[--btn-icon:theme(colors.yellow.700)]',
        ],
        lime: [
            'text-lime-950 [--btn-hover-overlay:theme(colors.white/25%)] [--btn-bg:theme(colors.lime.300)] [--btn-border:theme(colors.lime.400/80%)]',
            '[--btn-icon:theme(colors.lime.600)] data-[active]:[--btn-icon:theme(colors.lime.700)] data-[hover]:[--btn-icon:theme(colors.lime.700)]',
        ],
        green: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]',
            '[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
        ],
        emerald: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.emerald.600)] [--btn-border:theme(colors.emerald.700/90%)]',
            '[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
        ],
        teal: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.teal.600)] [--btn-border:theme(colors.teal.700/90%)]',
            '[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
        ],
        sky: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.sky.500)] [--btn-border:theme(colors.sky.600/80%)]',
            '[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
        ],
        blue: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]',
            '[--btn-icon:theme(colors.blue.400)] data-[active]:[--btn-icon:theme(colors.blue.300)] data-[hover]:[--btn-icon:theme(colors.blue.300)]',
        ],
        violet: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.violet.500)] [--btn-border:theme(colors.violet.600/90%)]',
            '[--btn-icon:theme(colors.violet.300)] data-[active]:[--btn-icon:theme(colors.violet.200)] data-[hover]:[--btn-icon:theme(colors.violet.200)]',
        ],
        purple: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.purple.500)] [--btn-border:theme(colors.purple.600/90%)]',
            '[--btn-icon:theme(colors.purple.300)] data-[active]:[--btn-icon:theme(colors.purple.200)] data-[hover]:[--btn-icon:theme(colors.purple.200)]',
        ],
        fuchsia: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.fuchsia.500)] [--btn-border:theme(colors.fuchsia.600/90%)]',
            '[--btn-icon:theme(colors.fuchsia.300)] data-[active]:[--btn-icon:theme(colors.fuchsia.200)] data-[hover]:[--btn-icon:theme(colors.fuchsia.200)]',
        ],
        pink: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.pink.500)] [--btn-border:theme(colors.pink.600/90%)]',
            '[--btn-icon:theme(colors.pink.300)] data-[active]:[--btn-icon:theme(colors.pink.200)] data-[hover]:[--btn-icon:theme(colors.pink.200)]',
        ],
        rose: [
            'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.rose.500)] [--btn-border:theme(colors.rose.600/90%)]',
            '[--btn-icon:theme(colors.rose.300)] data-[active]:[--btn-icon:theme(colors.rose.200)] data-[hover]:[--btn-icon:theme(colors.rose.200)]',
        ],
    },
}

export const Button = forwardRef(function Button({ color, outline, plain, className, children, loading=false,  disable= false, ...props }, ref) {
    let classes = clsx(
        className,
        styles.base,
        outline ? styles.outline : plain ? styles.plain : clsx(styles.solid, styles.colors[color ?? 'dark/zinc'])
    )

    return 'href' in props ? (
        <Link {...props} className={classes} ref={ref}>
            <TouchTarget>{children}</TouchTarget>
        </Link>
    ) : (
        <Headless.Button {...props} disabled={disable} className={clsx(classes, 'cursor-default')} ref={ref}>
            <TouchTarget>
                {children}
                {loading && <span className={'text-[14px] opacity-70'}><FontAwesomeIcon icon={faCircleNotch} spin/></span>}
            </TouchTarget>
        </Headless.Button>
    )
})

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }) {
    return (
        <>
      <span
          className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
          aria-hidden="true"
      />
            {children}
        </>
    )
}
