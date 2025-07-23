import { useState, useEffect } from "react"
import { MapPin, Clock, Phone, Star, Navigation, Filter } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet"
import L from "leaflet"
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import iconRed from "leaflet/dist/images/marker-icon.png"

const defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const redIcon = L.icon({
  iconUrl: iconRed,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const highlightedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function SetViewOnLocation({ position }) {
  const map = useMap()
  map.setView(position, 15)
  return null
}

function FlyToMarker({ center, zoom }) {
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom)
    }
  }, [center, zoom, map])

  return null
}

const Nearby = () => {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedCenter, setSelectedCenter] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = [position.coords.latitude, position.coords.longitude]
          setCurrentPosition(userPos)
          setMapCenter(userPos)
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  const recyclingCenters = [
    {
      id: 1,
      name: "GreenCycle Hub",
      type: "Full Service",
      distance: "0.8 km",
      rating: 4.8,
      reviews: 124,
      address: "123 Eco Street, Green District",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sat: 8AM-6PM, Sun: 10AM-4PM",
      services: ["Plastic", "Paper", "Metal", "Glass", "Electronics"],
      coordinates: currentPosition ? [currentPosition[0] + 0.005, currentPosition[1] + 0.005] : [28.6189, 77.2140],
    },
    {
      id: 2,
      name: "Metro Recycling Center",
      type: "Electronics Only",
      distance: "1.2 km",
      rating: 4.6,
      reviews: 89,
      address: "456 Tech Avenue, Downtown",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Fri: 9AM-5PM, Closed Weekends",
      services: ["Electronics", "Batteries"],
      coordinates: currentPosition ? [currentPosition[0] - 0.005, currentPosition[1] + 0.008] : [28.6089, 77.2170],
    },
    {
      id: 3,
      name: "Community Drop-off Point",
      type: "Basic Recycling",
      distance: "2.1 km",
      rating: 4.3,
      reviews: 67,
      address: "789 Community Road, Suburb",
      phone: "+1 (555) 345-6789",
      hours: "24/7 Drop-off Available",
      services: ["Paper", "Plastic", "Glass"],
      coordinates: currentPosition ? [currentPosition[0] + 0.008, currentPosition[1] - 0.01] : [28.6219, 77.1990],
    },
    {
      id: 4,
      name: "EcoWaste Solutions",
      type: "Industrial",
      distance: "3.5 km",
      rating: 4.9,
      reviews: 203,
      address: "321 Industrial Blvd, Business Park",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-4PM",
      services: ["Metal", "Plastic", "Paper", "Hazardous Waste"],
      coordinates: currentPosition ? [currentPosition[0] - 0.01, currentPosition[1] - 0.005] : [28.6039, 77.2040],
    },
  ]

  const filterOptions = [
    { value: "all", label: "All Centers" },
    { value: "electronics", label: "Electronics" },
    { value: "plastic", label: "Plastic" },
    { value: "paper", label: "Paper" },
    { value: "metal", label: "Metal" },
    { value: "glass", label: "Glass" },
  ]

  const filteredCenters = recyclingCenters.filter((center) => {
    if (selectedFilter === "all") return true
    return center.services.some((service) => service.toLowerCase().includes(selectedFilter.toLowerCase()))
  })

  const handleCenterClick = (center) => {
    setSelectedCenter(center)
    setMapCenter(center.coordinates)
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-24 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Nearby Collection Centers</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find the closest recycling centers and drop-off points in your area.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none transition-colors"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Interactive Map</h2>
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 relative bg-gradient-to-br from-emerald-900/30 to-neutral-900/50">
              <MapContainer center={mapCenter} zoom={15} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {currentPosition && <SetViewOnLocation position={currentPosition} />}
                {selectedCenter && <FlyToMarker center={selectedCenter.coordinates} zoom={16} />}
                
                {currentPosition && (
                  <Marker position={currentPosition} icon={defaultIcon}>
                    <Popup>
                      <div className="bg-white p-2 rounded shadow-md w-48">
                        <h4 className="text-blue-600 font-medium mb-1">Your Location</h4>
                        <p className="text-xs text-gray-600">
                          This is your current position
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {filteredCenters.map((center) => (
                  <Marker
                    key={center.id}
                    position={center.coordinates}
                    icon={selectedCenter?.id === center.id ? highlightedIcon : redIcon}
                    eventHandlers={{
                      click: () => handleCenterClick(center),
                    }}
                  >
                    <Popup>
                      <div className="bg-white p-2 rounded shadow-md w-48">
                        <h4 className="text-green-600 font-medium mb-1">{center.name}</h4>
                        <p className="text-xs text-gray-600 mb-1">{center.address}</p>
                        <div className="flex items-center text-xs">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          <span>{center.rating} ({center.reviews})</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* {currentPosition && (
                  <Circle center={currentPosition} radius={500} color="blue" fillOpacity={0.1} />
                )} */}
              </MapContainer>
            </div>

            <div className="bg-neutral-900/80 border border-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-lime-400" />
                <span className="text-sm font-medium">Your Location</span>
              </div>
              <p className="text-sm text-gray-400">
                Enable location services for more accurate results and directions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Recycling Centers ({filteredCenters.length})</h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredCenters.map((center, index) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleCenterClick(center)}
                  className={`bg-neutral-900/80 border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-lime-400/50 ${
                    selectedCenter?.id === center.id ? "border-lime-400" : "border-white/5"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{center.name}</h3>
                        <p className="text-sm text-gray-400">{center.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lime-400 font-medium">{center.distance}</div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{center.rating}</span>
                          <span className="text-gray-400">({center.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        {center.address}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4" />
                        {center.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4" />
                        {center.hours}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Accepted Materials:</p>
                      <div className="flex flex-wrap gap-2">
                        {center.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 bg-neutral-800 border border-white/10 rounded text-xs"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded transition-colors text-sm font-medium">
                        Get Directions
                      </button>
                      <button className="px-4 py-2 border border-white/20 hover:border-lime-400 rounded transition-colors text-sm">
                        Call Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredCenters.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recycling centers found for the selected filter.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Nearby