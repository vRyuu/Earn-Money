import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  format?: 'auto' | 'horizontal' | 'vertical';
  slot: string;
}

export function AdBanner({ format = 'auto', slot }: AdBannerProps) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('Ad loading error:', error);
    }
  }, []);

  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="pub-7322213380425652"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}