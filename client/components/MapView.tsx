import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { MapPoint } from "@/lib/demoData";
import "leaflet/dist/leaflet.css";

export default function MapView({ points }: { points: MapPoint[] }) {
  const center = points.length
    ? [points[0].lat, points[0].lng]
    : [12.97, 77.59];
  return (
    <div className="h-[360px] w-full overflow-hidden rounded-lg border">
      <MapContainer
        center={center as any}
        zoom={5}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p, i) => (
          <CircleMarker
            key={i}
            center={[p.lat, p.lng] as any}
            radius={8}
            pathOptions={{ color: "#0ea5e9" }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{p.label}</div>
                <div className="text-muted-foreground">{p.zone}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
