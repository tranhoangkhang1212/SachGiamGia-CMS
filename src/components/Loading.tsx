import React from 'react';

const Loading = () => {
    return (
        <div className="flex-col flex-center">
            <div
                className="block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-[#fff0] align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            />
            <span className="mt-2 text-white">Loading...</span>
        </div>
    );
};

export default Loading;
