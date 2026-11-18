const PHOTO_ROOT = "/images/photography";

export function editorialPhoto(
  name,
  { width = 1000, height = 667, smallWidth = 520, position = "center" } = {},
) {
  const path = `${PHOTO_ROOT}/${name}`;
  return {
    image: `${path}.webp`,
    smallImage: `${path}-${smallWidth}.webp`,
    imageWidth: width,
    imageHeight: height,
    smallImageWidth: smallWidth,
    imagePosition: position,
  };
}

export function photoSrcSet({
  smallImage,
  smallImageWidth,
  image,
  imageWidth,
}) {
  return `${smallImage} ${smallImageWidth}w, ${image} ${imageWidth}w`;
}
