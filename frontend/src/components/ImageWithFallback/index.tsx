import { ImgHTMLAttributes, useState } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback: () => JSX.Element | null;
  src: string;
}

export default function ImageWithFallback({
  fallback,
  src,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return fallback();
  }

  return <img src={src} onError={() => setError(true)} {...rest} />;
}
