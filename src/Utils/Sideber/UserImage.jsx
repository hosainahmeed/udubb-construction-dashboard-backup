import React from 'react';
import { imageUrl } from '../server.js';
import { Image } from 'antd';

const UsernameImage = ({ name, email, image }) => {
  return (
    <div className="start-center gap-3 rounde">
      {image && (
        <Image
          preview={true}
          src={imageUrl(image)}
          className="!w-16 !h-12 object-cover rounded-md overflow-hidden"
          alt={name}
        />
      )}
      <div className="flex flex-col items-start">
        {name && <p className="text-base leading-none">{name}</p>}
        {email && <p className="text-[#808080] leading-none text-sm">{email}</p>}
      </div>
    </div>
  );
};

export default UsernameImage;
