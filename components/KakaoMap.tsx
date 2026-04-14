"use client";

import { useEffect, useRef } from "react";

interface KakaoMapProps {
  address: string;
  placeName: string;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => object;
        Map: new (container: HTMLElement, options: object) => object;
        Marker: new (options: object) => { setMap: (map: object) => void };
        InfoWindow: new (options: object) => { open: (map: object, marker: object) => void };
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: Array<{ y: string; x: string }>, status: string) => void
            ) => void;
          };
          Status: { OK: string };
        };
      };
    };
  }
}

export default function KakaoMap({ address, placeName }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const coords = new window.kakao.maps.LatLng(
              parseFloat(result[0].y),
              parseFloat(result[0].x)
            );
            const map = new window.kakao.maps.Map(mapRef.current!, {
              center: coords,
              level: 3,
            });
            const marker = new window.kakao.maps.Marker({ position: coords });
            marker.setMap(map);

            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:6px 10px;font-size:13px;">${placeName}</div>`,
            });
            infoWindow.open(map, marker);
          }
        });
      });
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [address, placeName]);

  if (!process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center border border-gray-200">
        <p className="text-sm text-gray-400">지도를 표시하려면 카카오 맵 API 키를 설정하세요.</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-96 bg-gray-100" />;
}
