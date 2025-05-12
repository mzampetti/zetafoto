import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBlock({ locale, record }) {
  const { latitude, longitude } = record;
  const urlStyleMapbox = "mapbox://styles/mapbox/outdoors-v12";
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2FudGllcmVjcmVhdGl2byIsImEiOiJjbTduM3hzaGwwcTY4Mm1yenRuaXVlcmhqIn0.ZCLvpDX2bEl-bC45Uh3rGg";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: urlStyleMapbox,
      center: [longitude, latitude],
      zoom: 10,
      scrollZoom: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    const markerDiv = document.createElement("div");
    markerDiv.className =
      "absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0";
    const root = createRoot(markerDiv);
    root.render(
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-12 fill-secondary"
        >
          <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      </div>
    );

    const marker = new mapboxgl.Marker(markerDiv)
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;

    return () => {
      marker.remove();
      map.remove();
    };
  }, [latitude, longitude, 12]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full aspect-[3/1] relative overflow-hidden mt-8 lg:mt-20"
    />
  );
}
