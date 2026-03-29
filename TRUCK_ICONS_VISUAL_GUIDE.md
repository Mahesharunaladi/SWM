# Truck Icons Visual Guide

## Truck Icon States

### Active Truck Icon (🚚)
```
Status: Active/Moving
Color: Green (#10b981)
Emoji: 🚚 (delivery truck)
Animation: Pulsing ring effect
Size: 45x45px with label

Visual Representation:
┌──────────────────────┐
│  ╔═══════════════╗   │
│  ║               ║   │
│  ║     🚚        ║   │  ← Green border
│  ║               ║   │
│  ║         •┉┉•  ║   │  ← Pulsing animation
│  ║       ┉       ┉  ║
│  ╚═══════════════╝   │
│      TRK-001        │  ← Truck ID label
└──────────────────────┘

Characteristics:
✓ Green border (#10b981)
✓ Delivery truck emoji
✓ Animated pulsing ring (2s cycle)
✓ Box shadow for depth
✓ Position updates every 5 seconds
✓ Speed changes randomly
✓ Waste collected increases
```

### Idle Truck Icon (🚛)
```
Status: Idle/Parked
Color: Gray (#9ca3af)
Emoji: 🛛 (dump truck)
Animation: None
Size: 45x45px with label

Visual Representation:
┌──────────────────────┐
│  ╔═══════════════╗   │
│  ║               ║   │
│  ║     🚛        ║   │  ← Gray border
│  ║               ║   │
│  ║               ║   │  ← No animation
│  ║               ║   │
│  ╚═══════════════╝   │
│      TRK-003        │  ← Truck ID label
└──────────────────────┘

Characteristics:
✓ Gray border (#9ca3af)
✓ Dump truck emoji
✓ No animation
✓ Static position
✓ Speed remains 0
✓ No waste collection
```

### Selected Truck Icon
```
Status: Any (Active or Idle)
Highlight: Selected
Color: Blue border (#3b82f6)
Background: Light blue (#eff6ff)
Animation: Enlarged scale (1.15x)
Action: Map centers on this truck

Visual Representation (Active Selected):
┌──────────────────────────────┐
│      ╔═════════════════╗     │
│      ║                 ║     │
│      ║       🚚        ║     │  ← Blue border
│      ║                 ║     │
│      ║           •┉┉•  ║     │  ← Still pulsing if active
│      ║         ┉       ┉    ║
│      ╚═════════════════╝     │
│          TRK-001            │  ← Larger text
└──────────────────────────────┘

Characteristics:
✓ Blue border (#3b82f6)
✓ Light blue background (#eff6ff)
✓ Larger size (scale 1.15)
✓ Enhanced shadow
✓ Map zooms/pans to show
✓ Popup opens automatically
✓ Still animates if active
```

## Map Visual Layout

```
┌──────────────────────────────────────────────────────────────┐
│ 🗺️ Live Truck Tracking                                       │
│ Real-time vehicle locations and collection status            │
│ ┌────────────────────────────────────────────────────────────┤
│ │ ┌──┐ ┌──┐ ┌──┐  ← Map Controls                             │
│ │ │🔍+│ │🔍−│ │🎯│  (top-right)                             │
│ │ └──┘ └──┘ └──┘                                             │
│ │                                                             │
│ │     [OpenStreetMap of Bangalore]                           │
│ │                                                             │
│ │          🚚      ← TRK-001 Active (pulsing)               │
│ │        TRK-001                                             │
│ │                                                             │
│ │                 🚚     ← TRK-002 Active                   │
│ │               TRK-002                                      │
│ │                                                             │
│ │       🚛             ← TRK-003 Idle                       │
│ │     TRK-003                                                │
│ │                    🚚  ← TRK-004 Active                   │
│ │                  TRK-004                                   │
│ │                                                             │
│ │ ┌───────────────────────────────┐                         │
│ │ │ Legend (bottom-left)          │                         │
│ │ │ ─────────────────────────────  │                         │
│ │ │ 🚚 Active Truck               │                         │
│ │ │ 🚛 Idle Truck                 │                         │
│ │ └───────────────────────────────┘                         │
│ └────────────────────────────────────────────────────────────┤
└──────────────────────────────────────────────────────────────┘
```

## Truck Popup Information

```
When you click on a truck icon:

╔════════════════════════════════╗
║        TRK-001                 ║  ← Close (X)
║ ══════════════════════════════ ║
║ Driver:       Rajesh Kumar     ║
║ ──────────────────────────────  ║
║ Status:       ACTIVE           ║  ← Green badge
║ Speed:        25 km/h          ║
║ Collections:  12               ║
║ Waste:        245.3 kg         ║
║ Next Bin:     BIN-045          ║
║ Efficiency:   92%              ║
╚════════════════════════════════╝
   ▲ (Points to truck on map)
```

## Icon Animation Details

### Pulsing Ring Animation (Active Trucks Only)
```
Frame 1 (0s):     Frame 2 (0.5s):   Frame 3 (1s):     Frame 4 (1.5s):   Frame 5 (2s):
  ┌─────┐        ┌───────┐        ┌─────────┐        ┌─────┐          ┌─────┐
  │ 🚚  │        │ 🚚    │        │   🚚    │        │ 🚚  │          │ 🚚  │
  └─────┘        │     • │        │   •     │        │ •   │          └─────┘
                 └───────┘        └─────────┘        └─────┘
              (zooms out)         (full size)      (zooms in)         (repeat)

Animation properties:
Duration: 2 seconds
Easing: Linear
Repeat: Infinite
Effect: Creates "active" visual indicator
```

## Color Coding Reference

| Status | Color | RGB | Hex | Border | Background |
|--------|-------|-----|-----|--------|-----------|
| Active | Green | 16, 185, 129 | #10b981 | ✓ | Slightly transparent |
| Idle | Gray | 156, 163, 175 | #9ca3af | ✓ | Slightly transparent |
| Selected | Blue | 59, 130, 246 | #3b82f6 | ✓ | Light blue (#eff6ff) |
| Text | Dark Gray | 31, 41, 55 | #1f2937 | - | - |

## Icon Size Specifications

| Element | Width | Height | Unit |
|---------|-------|--------|------|
| Icon Container | 45 | 45 | px |
| Icon Anchor | 22.5 | 50 | px (from left/top) |
| Emoji Font Size | 24 | - | px |
| Label Font Size | 10 | - | px |
| Border Radius | 8 | - | px |
| Box Shadow Offset | 0, 2 | 8 | px, px, px |

## Responsive Design

### Desktop (> 1024px)
- Icon size: 45x45px
- Label font: 10px
- Full map with all controls
- Legend visible
- Smooth animations

### Tablet (768px - 1024px)
- Icon size: 42x42px
- Label font: 9px
- Slightly smaller controls
- Legend still visible
- Same animations

### Mobile (< 768px)
- Icon size: 40x40px
- Label font: 8px
- Compact controls
- Legend visible (small)
- Optimized animations
- Touch-friendly

## State Transitions

```
Initial Load
    ↓
Map Displays (Bangalore centered)
    ↓
4 Truck Icons Appear
├─ 3 Active (🚚) with pulsing
└─ 1 Idle (🚛) static
    ↓
User Interactions
├─ Click truck → Select (Blue highlight) → Show popup
├─ Click map → Deselect → Close popup
├─ Drag map → Pan view
├─ Scroll/Buttons → Zoom in/out
└─ Click reset → Return to default
    ↓
Auto Refresh (if enabled)
├─ Update truck positions
├─ Change speeds
└─ Increase waste (every 5 seconds)
```

## Legend Details

```
Map Legend Box (Bottom-Left):

┌─────────────────────────────┐
│ Legend                      │ ← Header
│ ───────────────────────────  │
│ 🚚  Active Truck            │ ← Green emoji, active status
│                             │
│ 🚛  Idle Truck              │ ← Gray emoji, idle status
└─────────────────────────────┘

Location: Bottom-left corner
Always visible: Yes
Update frequency: Static (doesn't change)
Background: White with border
Shadow: Subtle depth
Padding: 12px
```

## Mobile View Adjustments

```
Desktop View:              Mobile View:
┌────────────────────┐    ┌──────────────┐
│ 🔍+  🔍−  🎯       │    │ 🔍+          │
│   (top-right)      │    │ 🔍−  (right) │
│                    │    │ 🎯           │
│    [MAP]           │    │              │
│                    │    │  [MAP]       │
│ ┌──────────────┐   │    │              │
│ │Legend        │   │    │ ┌─────────┐  │
│ │ 🚚 Active    │   │    │ │Legend   │  │
│ │ 🚛 Idle      │   │    │ │🚚 Active│  │
│ └──────────────┘   │    │ │🚛 Idle  │  │
└────────────────────┘    │ └─────────┘  │
                          └──────────────┘
```

## Hover Effects

```
When you hover over a truck icon:

Normal State:                Hover State:
┌─────────┐                ┌─────────────┐
│   🚚    │    ──hover→   │     🚚      │
└─────────┘                └─────────────┘
  TRK-001                     TRK-001
  45x45px                     49x49px (scaled)
  
Effects:
✓ Scale increases 10%
✓ Shadow becomes darker
✓ Cursor becomes pointer
✓ Z-index increases
```

## Truck Status Indicators

```
ACTIVE Status (Green):
┌────────────────┐
│ Color: #10b981 │ ← Green
│ Emoji: 🚚     │ ← Delivery truck
│ Animation: Yes │ ← Pulsing ring
│ Updates: Yes   │ ← Position changes
│ Speed: 10-50   │ ← Varies
│ Collecting: Yes│ ← Waste increases
└────────────────┘

IDLE Status (Gray):
┌────────────────┐
│ Color: #9ca3af │ ← Gray
│ Emoji: 🚛     │ ← Dump truck
│ Animation: No  │ ← Static
│ Updates: No    │ ← Position fixed
│ Speed: 0       │ ← Stationary
│ Collecting: No │ ← No waste
└────────────────┘
```

---

**Visual Icon Repository**: All truck icon styles are defined in `frontend/src/styles/MapComponent.css`

**Icon Generation**: Icons are generated dynamically based on truck data in `MapComponent.jsx`

**Update Frequency**: Truck icons refresh every 5 seconds (configurable)
