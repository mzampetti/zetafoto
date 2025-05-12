import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useInView, Variants } from "framer-motion";

const variants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

export default function MapBlock({ locale, map }) {
  // const { titleMap, textMap, map, tokenMap, urlStyleMapbox, zoom } = content;
  const { latitude, longitude } = map;
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const zoomLevel = 10;

  useEffect(() => {
    if (!mapContainerRef.current || isNaN(latitude) || isNaN(longitude)) {
      console.error(
        "Latitudine o longitudine non valide:",
        latitude,
        longitude
      );
      return;
    }

    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2FudGllcmVjcmVhdGl2byIsImEiOiJjbTh6cWl6NWkwZDFwMmtyNmR0eWc5NHUzIn0.EDtsfvtIO-xvEc7SlFr5Ug";

    const myMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        "pk.eyJ1IjoiY2FudGllcmVjcmVhdGl2byIsImEiOiJjbTduM3hzaGwwcTY4Mm1yenRuaXVlcmhqIn0.ZCLvpDX2bEl-bC45Uh3rGg",
      center: [longitude, latitude],
      zoom: zoomLevel,
      scrollZoom: false,
    });

    myMap.addControl(new mapboxgl.NavigationControl(), "top-right");
    const markerDiv = document.createElement("div");
    markerDiv.className =
      "absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0";
    const root = createRoot(markerDiv);
    root.render(
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-8"
        >
          <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      </div>
    );

    const marker = new mapboxgl.Marker(markerDiv)
      .setLngLat([longitude, latitude])
      .addTo(myMap);

    markerRef.current = marker;

    return () => {
      marker.remove();
      myMap.remove();
    };
  }, [latitude, longitude, zoomLevel]);

  return (
    <>
      <div className="container">
        <div className="grid gap-6">
          <div
            ref={mapContainerRef}
            className="w-full h-[500px] xl:h-[800px] relative overflow-hidden"
          />
        </div>
      </div>
    </>
  );
}
