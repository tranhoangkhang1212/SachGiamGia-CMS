import React from 'react';
import Overlay from './Overlay';
import Loading from './Loading';

const LoadingOverlay = () => {
    return (
        <Overlay isShow={true} toggle={() => {}}>
            <Loading />
        </Overlay>
    );
};

export default LoadingOverlay;
