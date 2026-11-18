import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white/90 p-4 text-center ${className}`}
      >
        <ImageIcon className="w-7 h-7 mb-2 text-[#C4B5FD]" aria-hidden="true" />
        <span className="text-xs font-medium tracking-tight max-w-[180px] line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
