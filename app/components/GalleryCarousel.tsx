'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface GalleryCarouselProps {
  images: string[];
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      direction: 'rtl' // RTL support
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })] // Autoplay every 3 seconds
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="carousel-container">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container-inner">
          {images.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <div className="carousel-slide-inner">
                <Image
                  src={image}
                  alt={`תמונת גלריה ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button className="carousel-button carousel-button-prev" onClick={scrollPrev} aria-label="תמונה קודמת">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button className="carousel-button carousel-button-next" onClick={scrollNext} aria-label="תמונה הבאה">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === selectedIndex ? 'carousel-dot-active' : ''}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`עבור לתמונה ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
