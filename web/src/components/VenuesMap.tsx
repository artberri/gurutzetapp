import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { map } from "ramda";
import { useTranslation } from "react-i18next";
import { useVenues } from "../utils/VenueUtils";
import { Venue, VenueCategory } from "../domain/Venue";

const iconColor: Record<VenueCategory, string> = {
  official: "#25B750",
  business: "#EAB308",
  public: "#8B5CF6",
};

const icon = (category: VenueCategory) =>
  divIcon({
    html: `<svg style="filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="${iconColor[category]}" viewBox="0 0 20 20">
  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
</svg>`,
    className: "",
    iconAnchor: [16, 33],
    popupAnchor: [0, -33],
  });

const mapActivities = (lang: "es" | "eu") =>
  map((venue: Venue) => (
    <Marker
      key={venue.id}
      position={[venue.location.lat, venue.location.lng]}
      icon={icon(venue.category)}
    >
      <Popup>{venue.name[lang]}</Popup>
    </Marker>
  ));

export const VenuesMap = () => {
  const { i18n } = useTranslation();
  const { venues } = useVenues();
  const center = useMemo<[lat: number, lng: number]>(
    () => [43.281_579_4, -2.985_663_9],
    [],
  );

  return (
    <MapContainer className="w-full h-full" center={center} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapActivities(i18n.language as "es" | "eu")(venues)}
    </MapContainer>
  );
};
