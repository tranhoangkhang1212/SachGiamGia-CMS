import React, { useState } from 'react';
import NextImage from 'next/image';

interface IProps {
    className?: string;
    src: string;
    alt?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultUrl?: any;
}

const Image: React.FC<IProps> = (props) => {
    const { className, src, defaultUrl = '', alt = '' } = props;

    const [imageUrl, setImageUrl] = useState(src);
    return (
        <NextImage
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className={className}
            src={imageUrl}
            alt={alt}
            onError={() => setImageUrl(defaultUrl)}
        />
    );
};

export default Image;
