"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface LocationMapProps {
  lat: number;
  lng: number;
  name: string;
  location?: string;
  className?: string;
}

export function LocationMap({
  lat,
  lng,
  name,
  location,
  className = "",
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([lat, lng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Custom styled marker
      const customIcon = L.divIcon({
        html: `<div style="
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0a57a1, #3b89e5);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(10,87,161,0.4);
          border: 3px solid white;
        ">
          <svg style="transform: rotate(45deg); width: 16px; height: 16px; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>`,
        className: "custom-map-marker",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px 0;">
          <p style="font-weight: 700; font-size: 14px; color: #111827; margin: 0 0 4px 0;">${name}</p>
          ${location ? `<p style="font-size: 12px; color: #6b7280; margin: 0;">${location}</p>` : ""}
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: false,
        className: "custom-popup",
        maxWidth: 220,
      });

      marker.openPopup();

      mapInstanceRef.current = map;

      // Force resize after mount
      setTimeout(() => map.invalidateSize(), 100);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, name, location]);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm overflow-hidden ${className}`}
    >
      <div className="px-6 pt-5 pb-3 flex items-center gap-2">
        <div className="p-2 rounded-lg bg-blue-50">
          <MapPin className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Расположение</h3>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[280px] sm:h-[320px]"
        style={{ zIndex: 0 }}
      />
      <style>{`
        .custom-map-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 8px 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
