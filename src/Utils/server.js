// export const url = `${import.meta.env.VITE_URL}`;
export const url = `http://13.49.200.198:5050`;
export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : `https://placehold.co/400`;
};
