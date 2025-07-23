import React from 'react';

const Card = ({className, children}) => {
    return (
        <div className= {`bg-white mb-4 p-4 shadow-dashboardShadow ${className}`}>
            {children}
        </div>
    );
};

export default Card;