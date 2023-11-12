import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3JkZXNhaTMiLCJhIjoiY2xvdWpiMzR0MDFtODJqcW1oODk3amJ0aSJ9.o6dv_kSMsU7KlNkLbeYY3w";

type Props = {
  location: {
    lat: number;
    long: number;
  };
};

export default function Map({ location }: Props) {
  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  const [marker, setMarker] = useState(new mapboxgl.Marker())

  useEffect(() => {
    if (map.current) return;

    if (map) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current as any,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [location.long, location.lat],
        zoom: 19,
        attributionControl: false,
        scrollZoom: false,
        dragPan: false
      });

      marker
        .setLngLat([location.long, location.lat])
        .addTo(map.current);
    }
  }, []);

  useEffect(() => {
    if (map.current && marker) {
      map.current.setCenter([location.long, location.lat]);
      marker.setLngLat([location.long, location.lat]);
    }
  }, [location]);


  return (
    <div className="mt-4">
      <div ref={mapContainer} className="h-[600px]" />
    </div>
  );
}
