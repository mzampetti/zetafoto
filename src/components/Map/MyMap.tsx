import ReactMapGL, { Marker } from "react-map-gl";

interface MyMapProps {
  latitude: number;
  longitude: number;
  token: string;
  style: string;
  zoom: number;
}

function MyMap({ latitude, longitude, token, style, zoom }: MyMapProps) {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px]">
      <ReactMapGL
        initialViewState={{
          latitude,
          longitude,
          zoom,
        }}
        mapStyle={style || "mapbox://styles/mapbox/streets-v11"}
        mapboxAccessToken={token}
        // style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <Marker latitude={latitude} longitude={longitude} anchor="center">
          QUI 🚨
          {/* <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="size-8 bg-accent"
            >
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 12 7 12s7-6.75 7-12c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
          </div> */}
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default MyMap;
