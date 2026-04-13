# Mock Components - Avia Travel Club

<div align="center">
  <br />
  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Lucide-F56565?style=for-the-badge" alt="Lucide Icons" />
  </div>
  <h3 align="center">Full-Featured Travel Booking Platform Prototypes</h3>
  <div align="center">
     UI components with animations, state management, and complete user flows
  </div>
  <br />
  
  <!-- Demo Video -->
  <div align="center">
    <video src="https://github.com/user-attachments/assets/c01537b7-1504-4577-9fca-b1ddb93413b1" controls width="100%" style="max-width: 900px;">
      Your browser does not support the video tag.
    </video>
  </div>
  <br />
</div>

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Tech Stack](#️-tech-stack)
3. [Features](#-features)
4. [Quick Start](#-quick-start)
5. [Components Overview](#-components-overview)
6. [Mock Data](#-mock-data)
7. [Integration Guide](#-integration-guide)

## 🚀 Introduction

This is a **Next.js 15** travel booking platform for Avia Travel Club, containing **25+ fully functional components** built with real UI interactions, animations, and comprehensive mock data to demonstrate complete booking flows for flights, hotels, holiday packages, and visa assistance.

These components serve as:

- ✅ **Design prototypes** for client demos and stakeholder reviews
- ✅ **Development blueprints** for actual implementation
- ✅ **Testing playground** for UX flows and interactions
- ✅ **Reference implementation** for UI patterns and behaviors

> **Note:** Currently uses hardcoded mock data (`src/data.ts`). In production, will connect to real backend APIs.

## ⚙️ Tech Stack

- **Next.js 15.5** – React framework with Turbopack
- **React 19** – Modern component architecture with hooks
- **TypeScript 5** – Type safety and developer experience
- **Tailwind CSS 4** – Utility-first styling
- **Framer Motion 12** – Smooth animations and transitions
- **Lucide React** – Beautiful, consistent icon library
- **date-fns 4** – Lightweight date formatting
- **canvas-confetti** – Celebration animations

## ⚡ Features

### 🎯 **Complete Booking Flows**

- ✈️ **Flights** – Search, filter, sort, and book with real-time pricing
- 🏨 **Hotels** – Browse properties, select rooms, complete booking
- 🏖️ **Holiday Packages** – Explore curated trips with day-by-day itineraries
- 📄 **Visa Assistance** – Country requirements and application process

### 🎨 **Rich UI Components**

- **Interactive Search Forms** – Multi-tab interface with smart inputs
- **Advanced Filters** – Price range, stops, airlines, time slots, amenities
- **Loading Skeletons** – Smooth skeleton screens during data fetch
- **Step Indicators** – Visual progress tracking for multi-step flows
- **Responsive Carousels** – Image galleries with smooth navigation

### 🤖 **AI Trip Planner**

- Chat-based conversational interface
- Collects preferences (destination, budget, interests, travel style)
- Generates personalized day-by-day itineraries
- Recommends flights and hotels
- Export to PDF functionality

### 💳 **Payment Flow**

- Unified checkout for all booking types
- Multiple payment methods (Card, UPI, Net Banking, Wallets)
- Real-time fare calculation
- Booking confirmation with confetti animation
- Download tickets/vouchers, add to calendar

### 🎭 **Polished UX**

- Smooth page transitions with Framer Motion
- Optimistic UI updates
- Progressive disclosure (expandable details)
- Copy-to-clipboard functionality
- Mobile-friendly responsive design

## Quick Start

### Prerequisites

Ensure you have these installed:

- [Node.js 18+](https://nodejs.org/)
- npm or [pnpm](https://pnpm.io/)

### Installation & Setup

```bash
# Clone or navigate to the project
cd avia-travel-club-portal

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
avia-travel-club-portal/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main app with navigation
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── primitives/           # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── carousel.tsx
│   ├── HomePage.tsx          # Landing page
│   ├── FlightsPage.tsx       # Flight search
│   ├── HotelsPage.tsx        # Hotel search
│   ├── HolidaysPage.tsx      # Holiday packages
│   ├── VisaPage.tsx          # Visa assistance
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── types.ts              # TypeScript definitions
│   ├── data.ts               # Mock data
│   └── [20+ more components]
├── public/                   # Static assets
├── package.json
└── next.config.ts
```

## 📦 Components Overview

### **Core Pages** (8 components)

| Component               | Description                         |
| ----------------------- | ----------------------------------- |
| `HomePage.tsx`          | Landing page with multi-tab search  |
| `FlightsPage.tsx`       | Flight search results with filters  |
| `HotelsPage.tsx`        | Hotel listings with grid/list views |
| `HolidaysPage.tsx`      | Holiday package browser             |
| `VisaPage.tsx`          | Visa requirements and applications  |
| `HotelDetailPage.tsx`   | Individual hotel details & booking  |
| `PackageDetailPage.tsx` | Package details with itinerary      |
| `VisaDetailPage.tsx`    | Visa application form               |

### **Booking Flows** (4 components)

| Component                 | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| `UnifiedBookingFlow.tsx`  | Universal checkout (Details → Payment → Confirmation) |
| `HotelBookingFlow.tsx`    | Hotel-specific booking process                        |
| `BookingConfirmation.tsx` | Success page with confetti & actions                  |
| `PaymentPage.tsx`         | Payment method selection & processing                 |

### **Interactive Features** (3 components)

| Component                 | Description                               |
| ------------------------- | ----------------------------------------- |
| `AITripPlanner.tsx`       | AI chatbot for trip planning (~1,000 LOC) |
| `FlightFilters.tsx`       | Advanced filtering sidebar                |
| `TravelerDetailsForm.tsx` | Passenger/guest information form          |

### **UI Elements** (5 components)

| Component              | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `Header.tsx`           | Global navigation with currency/language selectors |
| `Footer.tsx`           | Site-wide footer with links                        |
| `FlightResultCard.tsx` | Flight display card with expandable details        |
| `StepIndicator.tsx`    | Progress tracker for multi-step flows              |
| `ReviewConfirm.tsx`    | Final review before payment                        |

### **Loading States** (2 components)

| Component                | Description                              |
| ------------------------ | ---------------------------------------- |
| `FlightCardSkeleton.tsx` | Animated loading placeholder for flights |
| `FiltersSkeleton.tsx`    | Loading placeholder for filters          |

### **Primitive Components** (4 files)

| File                      | Description                          |
| ------------------------- | ------------------------------------ |
| `primitives/badge.tsx`    | Styled badge component with variants |
| `primitives/button.tsx`   | Reusable button with multiple styles |
| `primitives/input.tsx`    | Form input with label and validation |
| `primitives/carousel.tsx` | Image carousel with navigation       |

### **Utilities** (2 files)

| File       | Description                                  |
| ---------- | -------------------------------------------- |
| `types.ts` | TypeScript interfaces (15+ types)            |
| `data.ts`  | Mock data (flights, hotels, packages, visas) |

## 📊 Mock Data

### Flights (`MOCK_FLIGHTS`)

```typescript
3 airlines × Various routes = 3 sample flights
- IndiGo (6E-2045) – DEL → BOM • ₹5,499 • Direct
- Vistara (UK-911) – DEL → BOM • ₹6,299 • Direct
- Air India (AI-804) – BLR → DEL • ₹4,899 • 1 stop (HYD)
```

### Hotels (`MOCK_HOTELS`)

```typescript
6 luxury properties across India
- Taj Mahal Palace (Mumbai) – ₹15,000/night • 5★
- Leela Palace (Bengaluru) – ₹18,000/night • 5★
- Oberoi Udaivilas (Udaipur) – ₹25,000/night • 5★
- Park Hyatt (Goa) – ₹12,000/night • 5★
- ITC Grand Chola (Chennai) – ₹14,000/night • 5★
- Trident (Jaipur) – ₹8,000/night • 4★
```

### Packages (`MOCK_PACKAGES`)

```typescript
6 curated holiday packages
- Goa Beach Escape – 5D/4N • ₹35,000/person
- Rajasthan Heritage – 7D/6N • ₹52,000/person
- Kerala Backwaters – 6D/5N • ₹42,000/person
- Himachal Adventure – 8D/7N • ₹48,000/person
- Andaman Paradise – 6D/5N • ₹65,000/person
- Golden Triangle – 5D/4N • ₹38,000/person
```

### Visas (`MOCK_VISAS`)

```typescript
8 countries with visa assistance
- United States (B-2) – ₹18,500 • 7-10 days
- United Kingdom – ₹14,200 • 15 days
- Canada – ₹11,800 • 20 days
- Schengen (EU) – ₹9,200 • 15 days
- Australia – ₹16,500 • 10 days
- Dubai (UAE) – ₹7,800 • 3-5 days
- Singapore – ₹6,500 • 5-7 days
- Thailand – ₹3,200 • On arrival
```

## 🔄 Integration Guide

### Moving from Mock to Production

#### 1. Replace Mock Data with API Calls

```typescript
// Before (Mock)
import { MOCK_FLIGHTS } from "./data";
const flights = MOCK_FLIGHTS;

// After (Production)
const response = await fetch("/api/flights/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(searchParams),
});
const flights = await response.json();
```

#### 2. Connect to Real State Management

```typescript
// Before (Mock - Local State)
const [filters, setFilters] = useState<FilterState>({ ... });

// After (Production - Global State)
// Option 1: Using Zustand
import { useFlightStore } from '@/stores/search.store';
const { filters, setFilters } = useFlightStore();

// Option 2: Using React Context
import { useSearchContext } from '@/context/SearchContext';
const { filters, setFilters } = useSearchContext();
```

#### 3. Integrate Payment Gateway

```typescript
// Replace mock payment with Razorpay
import { useRazorpay } from "@/hooks/useRazorpay";

const { initiatePayment } = useRazorpay();
await initiatePayment({
  amount: totalPrice,
  bookingId: booking.id,
  onSuccess: handlePaymentSuccess,
  onFailure: handlePaymentFailure,
});
```

#### 4. Add Real AI Chat

```typescript
// Replace mock responses with OpenAI API
const response = await fetch("/api/ai/chat", {
  method: "POST",
  body: JSON.stringify({ message: userInput, context: conversation }),
});

const stream = response.body;
// Handle streaming response
```

#### 5. Update Image Sources

```typescript
// Replace Unsplash with S3/CDN
- image: "https://images.unsplash.com/photo-..."
+ image: "https://cdn.aviatravelclub.com/hotels/taj-mumbai.jpg"
```

## Design System

### Brand Colors

```css
Primary: Purple Gradient (#667eea → #764ba2)
Accent: Orange (#f59e0b)
Success: Green (#10b981)
Error: Red (#ef4444)
```

### Typography

- **Font Family:** Geist Sans (Next.js default)
- **Heading Scale:** 2rem → 1.5rem → 1.25rem → 1rem
- **Body:** 1rem (16px) • Line Height: 1.5

### Spacing

- **Grid System:** 8px base unit
- **Container Max Width:** 1280px
- **Section Padding:** 4rem (64px)

## Known Limitations

⚠️ **Mock-Only Features:**

- No real payment processing (simulated)
- No backend persistence (data lost on refresh)
- Limited mock data (3 flights, 6 hotels, 6 packages)
- Client-side filtering only (no API pagination)
- Pre-scripted AI responses (not real OpenAI)
- No email/SMS notifications
- No authentication/authorization

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm run start
```
