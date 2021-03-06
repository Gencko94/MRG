import React from 'react';
import LazyLoad from 'react-lazyload';
import itemplaceholder from '../assets/imgplaceholder.png';
export default function LazyImage({ src, pb, alt, origin, placeholder }) {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        paddingBottom: pb,
        width: '100%',
      }}
    >
      <LazyLoad
        offset={300}
        placeholder={
          <img src={placeholder ? placeholder : itemplaceholder} alt={alt} />
        }
        className="max-h-full"
      >
        <img
          src={
            src
              ? `${process.env.REACT_APP_IMAGES_URL}/${
                  origin || 'original'
                }/${src}`
              : placeholder
              ? placeholder
              : itemplaceholder
          }
          alt={alt}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            display: 'block',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
          className="m-auto absolute "
        />
      </LazyLoad>
    </div>
  );
}
