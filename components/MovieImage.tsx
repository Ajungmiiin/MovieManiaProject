'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MovieImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MovieImage = ({ src, alt, className }: MovieImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScAclCeagZHixI7eql1IMVTZxCidfJ7qsN1i4UP2PdMicvSv6qLbiFNIkOeG7CBXQRLOY&usqp=CAU'
    );
  };

  return (
    <Image
      src={imgSrc}
      alt={alt || '영화 포스터'}
      onError={handleError}
      fill
      sizes="(max-width:360px) 40vw, (max-width : 640px) 100vw, 100vw"
      className={className}
      priority
    />
  );
};

export default MovieImage;
