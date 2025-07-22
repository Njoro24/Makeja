// src/components/hostel/HostelMap.jsx

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HostelMap = ({ hostels }) => {
  const ruiruPosition = [-1.1460, 36.9584];

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow mt-6">
      <MapContainer center={ruiruPosition} zoom={14} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hostels.map((hostel) => (
          <Marker
            key={hostel.id}
            position={[hostel.latitude, hostel.longitude]}
          >
            <Popup>
              <strong>{hostel.name}</strong><br />
              {hostel.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HostelMap;
