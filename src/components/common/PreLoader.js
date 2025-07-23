import React from 'react';

const PreLoader = () => {
    return (
        <div className="preloader-wrap fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/60">
            <div className="loader"></div>
        </div>
    );
};

export default PreLoader;