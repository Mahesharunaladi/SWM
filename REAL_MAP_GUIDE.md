# Real Map Integration - Live Tracking Guide

## Overview
The Live Tracking page now displays a real interactive map using **Leaflet** and **OpenStreetMap** with live truck positions marked with custom icons.

## Features Implemented

### 1. **Real Map Display**
- Interactive map centered on Bangalore, India (12.9716°N, 77.5946°E)
- Uses OpenStreetMap tiles for accurate geographical data
- Smooth animations and zoom controls

### 2. **Truck Icons on Map**
- **Active Trucks**: Displayed with 🚚 emoji
  - Green border and background
  - Pulsing animation ring
  - Real-time position updates
- **Idle Trucks**: Displayed with 🚛 emoji
  - Gray border and background
  - Static position
- **Selected Truck**: Highlighted with blue border
  - Larger icon size
  - Map centers on selected truck

### 3. **Interactive Features**
- **Click on Truck Icon**: Select truck and view detailed popup
- **Popup Information**: Shows truck details including:
  - Truck ID and Driver name
  - Current status (Active/Idle)
  - Speed, collections, waste collected
  - Next bin and efficiency rating
- **Map Zoom Controls**:
  - 🔍+ button: Zoom in
  - 🔍− button: Zoom out
  - 🎯 button: Reset to default view

### 4. **Map Legend**
- Shows truck status indicators
- Located at bottom-left corner
- Always visible for reference

## Technical Implementation

### Dependencies
```json
{
  "leaflet": "^1.9.x",
  "react-leaflet": "^4.x"
}
```

### Key Components

**MapComponent.jsx**
- Main map container component
- Manages truck markers and positioning
- Handles map interactions and zoom
- Updates truck positions every 5 seconds

### Props
```javascript
{
  trucks: Array,           // Array of truck objects with lat/lng
  selectedTruck: Object,   // Currently selected truck
  onTruckSelect: Function  // Callback when truck is clicked
}
```

### Truck Object Structure
```javascript
{
  id: 'TRK-001',
  driver: 'Rajesh Kumar',
  latitude: 12.9716,
  longitude: 77.5946,
  status: 'active',        // 'active' or 'idle'
  collectionsToday: 12,
  nextBin: 'BIN-045',
  efficiency: 92,
  speed: 25,
  wasteCollected: 245
}
```

## Files Modified

### 1. **frontend/src/components/MapComponent.jsx**
- Updated with Leaflet integration
- Custom truck icon rendering
- Marker click handlers
- Zoom and view controls

### 2. **frontend/src/styles/MapComponent.css**
- Truck icon styling
- Map control button styles
- Popup and legend styling
- Responsive design
- Animations and transitions

### 3. **frontend/src/pages/LiveTracking.jsx**
- Already integrated MapComponent
- Maintains truck state and selected truck
- Auto-refresh every 5 seconds

## How to Use

### 1. **View Live Map**
- Navigate to "Live Tracking" from sidebar
- Real-time map shows all trucks with their locations

### 2. **Select a Truck**
- Click on any truck icon on the map
- Map will zoom to that truck
- Popup shows detailed information

### 3. **Zoom and Pan**
- Use zoom buttons in top-right corner
- Click and drag to pan the map
- Use mouse scroll to zoom in/out

### 4. **View Truck Details**
- Click truck icon to open popup
- Popup displays:
  - Truck ID
  - Driver name
  - Current status
  - Speed
  - Collections today
  - Waste collected
  - Next bin to collect
  - Efficiency rating

### 5. **Auto-Refresh**
- Toggle "Auto Refresh" checkbox
- When enabled: Updates truck positions every 5 seconds
- When disabled: Static view

## Real-Time Updates

The map updates truck positions automatically:
- **Update Interval**: Every 5 seconds
- **When Active**: Active trucks move with small GPS variations
- **When Idle**: Idle trucks maintain position
- **Simulation**: Speed changes for active trucks
- **Waste Tracking**: Waste collected gradually increases

## API Integration Ready

To connect to real backend:

1. **Replace mock data in LiveTracking.jsx**:
```javascript
// Instead of useState mock data
// Fetch from API
useEffect(() => {
  const fetchTrucks = async () => {
    const response = await fetch('/api/trucks/live');
    const data = await response.json();
    setTrucks(data);
  };
  
  const interval = setInterval(fetchTrucks, 5000);
  return () => clearInterval(interval);
}, []);
```

2. **Expected API Response**:
```json
{
  "trucks": [
    {
      "id": "TRK-001",
      "driver": "Name",
      "latitude": 12.9716,
      "longitude": 77.5946,
      "status": "active",
      "collectionsToday": 12,
      "nextBin": "BIN-045",
      "efficiency": 92,
      "speed": 25,
      "wasteCollected": 245
    }
  ]
}
```

## Styling and Customization

### Change Truck Icon Colors
Edit `MapComponent.css`:
```css
.truck-map-icon.active {
  background: #your-color;
  border-color: #your-border-color;
}
```

### Modify Popup Style
Edit `MapComponent.jsx` popup HTML template

### Change Map Center
Edit `MapComponent.jsx` line with `setView()`:
```javascript
mapRef.current = L.map(mapContainer.current).setView([lat, lng], 13);
```

## Performance Considerations

- **Marker Reuse**: Markers are updated instead of recreated
- **Efficient Rendering**: Only truck position changes, not re-rendering whole map
- **Animation**: CSS animations for smooth UI
- **Zoom Optimization**: Smooth animations when centering on trucks

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support with touch controls

## Known Limitations

1. **Map Tiles**: Requires internet connection to load OSM tiles
2. **Max Zoom**: Limited to zoom level 19
3. **Update Frequency**: 5-second update interval (configurable)

## Troubleshooting

### Map Not Showing
- Check internet connection (needed for OSM tiles)
- Verify Leaflet CSS is imported
- Check browser console for errors

### Truck Icons Not Visible
- Verify truck data has valid latitude/longitude
- Check that status is 'active' or 'idle'
- Ensure MapComponent is imported correctly

### Popup Not Opening
- Click directly on the truck icon (not the label)
- Check no JavaScript errors in console
- Verify marker is properly created

## Future Enhancements

1. **Route Polylines**: Draw collection routes on map
2. **Historical Tracking**: View past truck movements
3. **Geofencing**: Alert when trucks enter/exit zones
4. **Real-time GPS**: Connect to actual GPS devices
5. **Heat Maps**: Visualization of waste collection density
6. **Multiple Maps**: Different views for different routes
7. **Offline Mode**: Cache map tiles for offline use
