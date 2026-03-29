# Dashboard Usage Guide - Quick Start

## 🚀 Getting Started

### Step 1: Login
1. Open the application
2. Use one of these credentials:
   - **admin@swm.com** / admin123
   - **supervisor@swm.com** / super123
   - **manager@swm.com** / manager123
   - **coordinator@swm.com** / coord123
3. Or click **"Try Demo Login"** for instant access

### Step 2: Access Dashboard
After successful login, you'll see:
- **Left Sidebar** - Navigation menu
- **Dashboard Page** - Overview with stats and truck information
- **Top Navigation** - User menu and logout button

---

## 📊 Dashboard Features

### Statistics Cards (Top Section)
```
🗑️ Active Bins          📊 Avg Fill Level      🚚 Collections Today    ♻️ Carbon Saved (kg)
1247                     68%                    12                      2345 kg
↑ 12% from last week     → stable               ↑ 8% from yesterday     ↑ 25% this month
```

### Live Truck Tracking Section
Each truck card shows:
- **Truck Number** (TRK-001, TRK-002, etc.)
- **Status** (Active/Idle)
- **Efficiency Rating** (92%, 88%, 85%)
- **Driver Name & Phone**
- **Action Buttons:**
  - ☎️ Call Driver
  - 🗺️ View Route (→ Navigates to Live Tracking)
- **Current Location** (GPS Coordinates)
- **Collection Status:**
  - ✅ Collected bins
  - ⏳ Pending bins
- **Total Waste Collected**

### Charts Section
- **Fill Level Distribution** - Shows empty, half-full, and full bins
- **Daily Collections** - 7-day trend visualization

### Recent Activity Table
Shows latest bin collection activities with:
- Bin ID
- Location
- Status (Collected, Full, Normal, Maintenance)
- Timestamp
- View button for details

---

## 🗺️ Live Tracking Features

### Accessing Live Tracking
1. **From Sidebar:** Click "Live Tracking" (🗺️)
2. **From Dashboard:** Click "View Route" (🗺️) on any truck card

### Interactive Map Controls
- **🔍+ / 🔍−** - Zoom in/out controls
- **Auto Refresh** - Toggle for real-time updates
- **Truck Markers** - Click to see truck details
  - 🚚 = Active truck (with pulsing indicator)
  - 🚛 = Idle truck

### Truck Information Panel
When you click a truck on the map or list:
- Driver information
- Live GPS coordinates
- Current speed (km/h)
- Collection statistics
- Next collection bin
- Efficiency rating

### Active Trucks List
Right side panel showing:
- Truck ID and status
- Driver name
- Collections count
- Next bin to collect
- Efficiency percentage
- Current coordinates

---

## 📱 QR Scanner Features

### Accessing QR Scanner
1. **From Sidebar:** Click "QR Scanner" (📱)

### How to Use
1. **Enter QR Code** - Type or scan QR code (e.g., QR-001)
2. **Press Enter or Click "Scan"**
3. **View Result** - Success or error message appears
4. **Log Waste** - Enter waste amount in kg (optional)
5. **Complete Route** - Click "End Route & Save"

### Route Information
Displays:
- Truck ID
- Driver name
- Total bins in route
- Scanned count
- Remaining count
- Progress bar

### Collection History
Shows all scanned bins with:
- Bin location
- Household address
- Timestamp
- Waste amount (editable)
- Status

---

## 📈 Analytics & Reports

### Accessing Analytics
1. **From Sidebar:** Click "Analytics" (📈)

### Key Metrics Displayed
- **Compliance Rate** - Percentage of compliant households
- **Total Collections** - Sum of all collections in period
- **Average Efficiency** - Fleet-wide efficiency percentage
- **Active Trucks** - Number of trucks in operation

### Charts
1. **Compliance Distribution** - Pie chart showing:
   - ✅ Compliant households
   - ⏳ Pending verification
   - ❌ Non-compliant households

2. **7-Day Collection Trend** - Bar chart showing:
   - Daily collection counts
   - Target line (150 collections/day)
   - Day-by-day comparison

### Truck Leaderboard
Ranked performance table:
```
🥇 1st Place - Truck & Driver name - 45 collections - 96% efficiency
🥈 2nd Place - Truck & Driver name - 42 collections - 94% efficiency
🥉 3rd Place - Truck & Driver name - 38 collections - 92% efficiency
4th Place   - Truck & Driver name - 35 collections - 88% efficiency
```

### Report Generation
- **Select Time Range** - Today, 7-day, 30-day, or 90-day
- **Download Report** - Click "📥 Download Report"
- **File Format** - Text report (.txt) with all metrics

### Key Insights
Auto-generated summary including:
- Compliance rate changes
- Total collections in period
- Fleet efficiency
- Best performing truck
- Households pending verification

---

## 👤 User Menu

### Accessing User Menu
Click the user icon in the top-right corner

### Options
- **View Profile** - Your user information
- **Settings** - Preferences and configuration
- **Logout** - Sign out (clears session)

---

## ⚙️ Navigation Menu Items

### Main Navigation (Sidebar)
1. **📊 Dashboard** - Overview and statistics
2. **📱 QR Scanner** - Scan and log waste collection
3. **🗺️ Live Tracking** - Real-time truck positions
4. **📈 Analytics** - Reports and performance metrics
5. **📄 Reports** - Detailed reports (coming soon)
6. **⚙️ Settings** - System configuration (coming soon)

---

## 🔑 Keyboard Shortcuts

- **Enter** in QR Scanner input - Submit scan
- Click truck on map - View details
- Click truck in sidebar - Highlight on map
- Filter buttons on dashboard - Change time period

---

## 💡 Tips & Tricks

### Dashboard
- Truck cards are clickable for more details
- Filter buttons show data for different time periods
- Orange status badges highlight bins that need attention

### Live Tracking
- Map auto-centers on selected truck
- Toggle "Auto Refresh" for real-time updates
- Speed color coding:
  - 🔴 Red = Too fast (>30 km/h)
  - 🟢 Green = Normal (15-30 km/h)
  - 🟡 Yellow = Slow (<15 km/h)
  - ⚪ Gray = Idle (0 km/h)

### QR Scanner
- Duplicate scans are automatically rejected
- Waste amount is optional but recommended
- Progress bar shows collection completion
- Clear history to reset route

### Analytics
- Time range affects all displayed metrics
- Leaderboard updates daily
- Compliance pie chart helps identify issues
- Download reports for record-keeping

---

## 🆘 Troubleshooting

### Dashboard not loading after login?
- Refresh the page (Cmd+R or Ctrl+R)
- Clear browser cache
- Try logging out and back in

### Map not showing trucks?
- Check if "Auto Refresh" is enabled
- Zoom out to see all trucks
- Try clicking a truck in the list

### QR codes not scanning?
- Ensure code format is correct (e.g., QR-001)
- Check valid QR codes in the mockBins object
- Clear history and try again

### Reports not downloading?
- Check browser download settings
- Try a different time range
- Ensure pop-ups aren't blocked

---

## 📞 Support

For issues or feature requests:
- Check this guide first
- Review error messages in the interface
- Contact system administrator
- Check application logs

---

## Version Info
- **App Version:** 1.0.0
- **Last Updated:** March 26, 2026
- **Status:** ✅ Fully Operational
