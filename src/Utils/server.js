export const url = `${import.meta.env.VITE_URL}`;
console.log(url);
export const imageUrl = (image) => {
  return image
    ? image?.startsWith(`http`)
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : `https://placehold.co/400`;
};
