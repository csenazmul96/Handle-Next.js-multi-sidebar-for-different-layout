/* eslint-disable react/prop-types */
import React from 'react';

export default function Field({ classes, label, children, htmlFor, error }) {
    const id = htmlFor || getChildId(children);
    return (
        <div className={classes}>
            {label && (
                <label htmlFor={id} className="text-[15px] text-textColor font-bold flex pb-2">
                    {label}
                </label>
            )}
            {children}
            {error && (
                <div role={'alert'} className="text-red-600">
                    {error.message}
                </div>
            )}
        </div>
    );
}

function getChildId(children) {
    const child = React.Children.only(children);
    if ('id' in child?.props) {
        return child.props.id;
    }
}