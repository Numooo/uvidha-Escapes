import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Moon,
  IndianRupee,
  Star,
  Heart,
  MapPin,
  Plane,
  Hotel as HotelIcon,
  Car,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "./primitives/badge";
import { PackageDetailPage } from "./PackageDetailPage";
import type { Package } from "./types";

// Mock package data with real Unsplash images
const MOCK_PACKAGES: Package[] = [
  {
    id: "1",
    title: "Goa Beach Escape",
    destination: "Goa, India",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    ],
    duration: { days: 5, nights: 4 },
    price: 35000,
    rating: 4.9,
    reviewCount: 234,
    theme: ["Beach", "Leisure"],
    inclusions: ["Flights", "Hotels", "Transfers", "Breakfast"],
    highlights: [
      "Beach resorts",
      "Water sports",
      "Sunset cruise",
      "Local cuisine",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Relaxation",
        desc: "Welcome to Goa! Upon arrival at Dabolim Airport, our representative will greet you and transfer you to your beach resort. Check-in and spend the afternoon relaxing on the pristine beaches. Evening at leisure to explore nearby beach shacks and enjoy authentic Goan cuisine.",
      },
      {
        day: 2,
        title: "North Goa Sightseeing",
        desc: "After breakfast, embark on a full-day tour of North Goa. Visit the magnificent Fort Aguada with its panoramic views, the historic Chapora Fort (Dil Chahta Hai fame), and the famous beaches - Calangute, Baga, and Anjuna. Optional water sports activities available. Evening free for shopping at Anjuna Flea Market or exploring the vibrant nightlife.",
      },
      {
        day: 3,
        title: "Water Sports & Adventure Day",
        desc: "Get your adrenaline pumping with exciting water sports! Try parasailing, jet skiing, banana boat rides, and bumper rides at Calangute Beach. Optional activities include scuba diving at Grande Island or a dolphin spotting cruise. Afternoon at leisure to relax on the beach. Evening sunset at a beach club with live music.",
      },
      {
        day: 4,
        title: "South Goa Exploration",
        desc: "Discover the serene beauty of South Goa. Visit the pristine Palolem Beach, peaceful Colva Beach, and the ancient Cabo de Rama Fort. Stop by a traditional spice plantation for a guided tour and authentic Goan lunch. Visit the Basilica of Bom Jesus (UNESCO World Heritage Site) and Se Cathedral. Return to hotel for your final evening in Goa.",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Enjoy your last breakfast with beach views. Check-out from the hotel and our representative will transfer you to Dabolim Airport for your onward journey. Depart with wonderful memories of your Goa beach escape!",
      },
    ],
  },
  {
    id: "2",
    title: "Himalayan Adventure",
    destination: "Manali, Himachal Pradesh",
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    ],
    duration: { days: 6, nights: 5 },
    price: 28000,
    rating: 4.8,
    reviewCount: 189,
    theme: ["Adventure", "Mountains"],
    inclusions: ["Accommodation", "Meals", "Transfers", "Activities"],
    highlights: ["Rohtang Pass", "Solang Valley", "Trekking", "Paragliding"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali",
        desc: "Arrive at Manali bus stand or Bhuntar Airport. Our representative will transfer you to your hotel. Check-in and relax after your journey. Evening walk at Mall Road for shopping and local food. Overnight stay at Manali hotel.",
      },
      {
        day: 2,
        title: "Manali Local Sightseeing",
        desc: "After breakfast, visit the ancient Hadimba Devi Temple surrounded by cedar forests, the Manu Temple, and Vashisht hot water springs. Explore the Tibetan Monastery and Van Vihar. Evening free for shopping at Mall Road. Dinner and overnight stay at hotel.",
      },
      {
        day: 3,
        title: "Rohtang Pass Adventure",
        desc: "Early morning departure for the thrilling journey to Rohtang Pass (13,050 ft) - a snow paradise! Enjoy snow activities like skiing, sledging, and snowboarding. Experience breathtaking views of glaciers and peaks. Return to Manali by evening. (Note: Rohtang Pass is subject to weather conditions and permits)",
      },
      {
        day: 4,
        title: "Solang Valley Activities",
        desc: "Full day excursion to Solang Valley, the adventure capital. Try paragliding, zorbing, horse riding, and cable car rides. Optional activities include ATV rides and quad biking. Enjoy the stunning mountain scenery and glaciers. Evening return to Manali for overnight stay.",
      },
      {
        day: 5,
        title: "Kullu & Manikaran Excursion",
        desc: "After breakfast, drive to Kullu Valley for river rafting on River Beas (optional). Visit the famous Kullu shawl factories. Continue to Manikaran, famous for its hot springs and religious significance. Visit the Gurudwara and hot water springs. Return to Manali by evening.",
      },
      {
        day: 6,
        title: "Departure",
        desc: "Enjoy your last breakfast in the mountains. Check-out and transfer to Bhuntar Airport or Manali bus stand for your onward journey. Take home unforgettable memories of your Himalayan adventure!",
      },
    ],
  },
  {
    id: "3",
    title: "Kerala Backwaters",
    destination: "Kerala, India",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    ],
    duration: { days: 4, nights: 3 },
    price: 22000,
    rating: 4.7,
    reviewCount: 156,
    theme: ["Nature", "Wellness"],
    inclusions: ["Houseboat", "Meals", "Transfers", "Ayurveda Spa"],
    highlights: [
      "Houseboat cruise",
      "Alleppey backwaters",
      "Ayurvedic massage",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cochin",
        desc: "Arrive at Cochin International Airport. Meet our representative and transfer to your hotel. After check-in, proceed for Cochin city tour - visit Fort Kochi, Chinese Fishing Nets, St. Francis Church, Dutch Palace, and Jewish Synagogue. Evening witness the traditional Kathakali dance performance. Overnight at Cochin hotel.",
      },
      {
        day: 2,
        title: "Houseboat Check-in & Backwater Cruise",
        desc: "After breakfast, drive to Alleppey (approx 90 minutes). Board your private traditional Kerala houseboat around noon. Cruise through the enchanting backwaters, witnessing village life, paddy fields, and coconut groves. Enjoy freshly prepared Kerala meals onboard. Experience the tranquil sunset from your houseboat. Overnight stay on houseboat with all meals included.",
      },
      {
        day: 3,
        title: "Alleppey to Kumarakom - Wellness Day",
        desc: "Disembark from houseboat after breakfast. Drive to Kumarakom (30 minutes). Check-in at your wellness resort. Afternoon enjoy a rejuvenating Ayurvedic massage and spa treatment. Evening explore the Kumarakom Bird Sanctuary or relax by Vembanad Lake. Dinner at resort with traditional Kerala cuisine.",
      },
      {
        day: 4,
        title: "Departure",
        desc: "Morning at leisure to enjoy the resort facilities or take a peaceful walk by the backwaters. After breakfast, check-out and transfer to Cochin Airport for your departure flight. Leave with renewed energy and peaceful memories of God's Own Country.",
      },
    ],
  },
  {
    id: "4",
    title: "Rajasthan Heritage Tour",
    destination: "Jaipur, Udaipur, Jodhpur",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    ],
    duration: { days: 7, nights: 6 },
    price: 45000,
    rating: 4.9,
    reviewCount: 312,
    theme: ["Heritage", "Culture"],
    inclusions: ["Flights", "Hotels", "Guide", "Transfers", "Breakfast"],
    highlights: [
      "Amber Fort",
      "City Palace",
      "Mehrangarh Fort",
      "Lake Pichola",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaipur - The Pink City",
        desc: "Arrive at Jaipur International Airport. Transfer to your heritage hotel. After check-in, evening visit to the iconic Hawa Mahal (Palace of Winds) and explore the bustling local markets of Johari Bazaar and Bapu Bazaar. Enjoy welcome dinner with traditional Rajasthani folk performances.",
      },
      {
        day: 2,
        title: "Jaipur Sightseeing",
        desc: "Morning visit to the magnificent Amber Fort - enjoy an elephant/jeep ride up the fort. Explore the stunning mirror palace (Sheesh Mahal). Continue to City Palace, Jantar Mantar (UNESCO site), and Albert Hall Museum. Evening at Jal Mahal for photo opportunities. Optional: Light and sound show at Amber Fort.",
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur",
        desc: "After breakfast, drive to Jodhpur (6 hours) - the Blue City. En-route visit the Brahma Temple at Pushkar. Upon arrival, check-in at hotel. Evening explore the blue-painted houses of old city and the vibrant Clock Tower Market. Overnight in Jodhpur.",
      },
      {
        day: 4,
        title: "Jodhpur Exploration",
        desc: "Full day to explore Jodhpur. Visit the imposing Mehrangarh Fort perched on a hill - one of India's largest forts with spectacular views. Explore Jaswant Thada (Taj Mahal of Marwar), Umaid Bhawan Palace (part is now a luxury hotel and museum). Evening enjoy sunset from the fort ramparts. Dinner at a rooftop restaurant overlooking the blue city.",
      },
      {
        day: 5,
        title: "Jodhpur to Udaipur via Ranakpur",
        desc: "Morning drive to Udaipur (6 hours). En-route visit the stunning Ranakpur Jain Temples known for their intricate marble architecture and 1,444 pillars. Continue to Udaipur - the City of Lakes. Check-in at your hotel. Evening sunset boat ride on Lake Pichola with views of City Palace and Lake Palace. Overnight in Udaipur.",
      },
      {
        day: 6,
        title: "Udaipur - Venice of the East",
        desc: "Full day Udaipur sightseeing. Visit the magnificent City Palace complex with its courtyards, museums, and lake views. Explore Jagdish Temple, Saheliyon ki Bari (Garden of Maidens), and Fateh Sagar Lake. Optional visit to Sajjangarh Palace (Monsoon Palace) for panoramic sunset views. Evening cultural show at Bagore ki Haveli. Farewell dinner at a lakeside restaurant.",
      },
      {
        day: 7,
        title: "Departure from Udaipur",
        desc: "Enjoy leisure breakfast with beautiful lake views. Depending on your flight time, optional shopping for miniature paintings, handicrafts, and textiles. Check-out and transfer to Udaipur Airport for your departure. Return home with rich memories of Rajasthan's royal heritage!",
      },
    ],
  },
  {
    id: "5",
    title: "Andaman Island Paradise",
    destination: "Port Blair, Havelock",
    images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"],
    duration: { days: 5, nights: 4 },
    price: 42000,
    rating: 4.8,
    reviewCount: 198,
    theme: ["Beach", "Adventure"],
    inclusions: ["Flights", "Hotels", "Ferry", "Meals", "Activities"],
    highlights: [
      "Radhanagar Beach",
      "Scuba diving",
      "Neil Island",
      "Cellular Jail",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair",
        desc: "Arrive at Veer Savarkar Airport, Port Blair. Transfer to hotel and check-in. After lunch, visit the historic Cellular Jail (Kala Pani) and learn about India's freedom struggle. In the evening, witness the moving Light & Sound Show at Cellular Jail. Visit Corbyn's Cove Beach. Overnight at Port Blair hotel.",
      },
      {
        day: 2,
        title: "Port Blair to Havelock Island",
        desc: "Early morning transfer to Port Blair harbor for ferry to Havelock Island (2.5 hours cruise). Upon arrival, check-in at beach resort. Afternoon visit the world-famous Radhanagar Beach (Asia's Best Beach) - pristine white sand and crystal-clear waters. Enjoy swimming and sunset. Evening at leisure to explore the local markets.",
      },
      {
        day: 3,
        title: "Havelock - Water Adventures",
        desc: "Morning excursion for scuba diving or snorkeling at Elephant Beach - witness colorful coral reefs and marine life. Post-lunch, relax at the beach or try kayaking through mangroves. Optional activities: Sea walking or game fishing. Evening bonfire on the beach (subject to availability). Overnight at Havelock resort.",
      },
      {
        day: 4,
        title: "Havelock to Neil Island Day Trip",
        desc: "After breakfast, take a ferry to Neil Island. Visit the natural coral formations at Natural Bridge (Howrah Bridge), the beautiful Bharatpur Beach for glass-bottom boat rides, and Laxmanpur Beach known for stunning sunsets. Enjoy fresh seafood lunch at a local restaurant. Return to Havelock by evening ferry.",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Morning at leisure to enjoy your last swim in the turquoise waters. After breakfast, check-out and take ferry back to Port Blair. If time permits, shopping for shell crafts and local items. Transfer to airport for your departure flight with memories of paradise!",
      },
    ],
  },
  {
    id: "6",
    title: "Leh Ladakh Expedition",
    destination: "Leh, Ladakh",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    duration: { days: 8, nights: 7 },
    price: 52000,
    rating: 5.0,
    reviewCount: 445,
    theme: ["Adventure", "Mountains"],
    inclusions: ["Flights", "Hotels", "Meals", "Permits", "Guide"],
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La", "Monasteries"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh - Acclimatization",
        desc: "Arrive at Leh Airport (11,500 ft). Transfer to hotel. Complete rest for acclimatization is mandatory. Evening short walk to Leh Market and Shanti Stupa for sunset views. Light dinner and overnight stay. (Important: Avoid heavy activities and drink plenty of water)",
      },
      {
        day: 2,
        title: "Leh Local Sightseeing",
        desc: "After breakfast, visit Leh Palace, Shanti Stupa, and Hall of Fame Museum (dedicated to Indian Army). Continue to Magnetic Hill (defying gravity phenomenon), Sangam (confluence of Indus and Zanskar rivers), and Gurudwara Pathar Sahib. Evening explore Leh Market. Overnight in Leh.",
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La",
        desc: "Early morning drive to Nubra Valley via Khardung La Pass (18,380 ft) - world's highest motorable road! Stop for photos and certificate. Descend to Nubra Valley and check-in at camp in Hunder. Afternoon enjoy double-humped Bactrian camel safari on sand dunes. Visit Diskit Monastery with giant Buddha statue. Overnight in camps/hotel.",
      },
      {
        day: 4,
        title: "Nubra Valley to Pangong Lake",
        desc: "After breakfast, drive to the legendary Pangong Lake (14,000 ft) via Shyok River route. The 5-6 hour journey offers spectacular mountain scenery. Arrive at Pangong - the crystal blue lake spanning India and China (famous from 3 Idiots movie). Evening at leisure by the lakeside watching color-changing waters. Overnight in camps near Pangong.",
      },
      {
        day: 5,
        title: "Pangong to Leh",
        desc: "Wake up to breathtaking sunrise over Pangong Lake. After breakfast, drive back to Leh via Changla Pass (17,590 ft) - third highest motorable pass. En-route visit Hemis Monastery (largest and wealthiest monastery in Ladakh) and Thiksey Monastery. Evening free for rest and shopping. Overnight in Leh.",
      },
      {
        day: 6,
        title: "Leh to Alchi & Lamayuru",
        desc: "Full day excursion to Alchi (one of the oldest monasteries, 1000+ years old) and Lamayuru (Moonland - most photographed monastery). Drive through scenic valleys and visit the confluence at Sangam again. Marvel at the ancient murals and thangkas at Alchi. Return to Leh by evening. Farewell dinner.",
      },
      {
        day: 7,
        title: "Reserve Day / Optional Activities",
        desc: "This day is kept as buffer for any road closures or weather issues (common in Ladakh). If all went well, optional activities include white water rafting on Zanskar River, visiting Tso Moriri Lake, or simply relaxing and shopping for Pashmina shawls, Buddhist artifacts, and handicrafts. Final evening in Leh.",
      },
      {
        day: 8,
        title: "Departure from Leh",
        desc: "After breakfast, check-out and transfer to Leh Airport. Enjoy scenic views during your flight back. The expedition to the Land of High Passes ends with lifetime memories! (Note: Morning flights are recommended due to afternoon wind conditions)",
      },
    ],
  },
  {
    id: "7",
    title: "Shimla Manali Honeymoon",
    destination: "Shimla, Manali",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    ],
    duration: { days: 5, nights: 4 },
    price: 32000,
    rating: 4.7,
    reviewCount: 267,
    theme: ["Honeymoon", "Mountains"],
    inclusions: ["Accommodation", "Meals", "Transfers", "Candlelight Dinner"],
    highlights: ["Mall Road", "Kufri", "Rohtang Pass", "Hidimba Temple"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla",
        desc: "Arrive at Shimla (by Kalka-Shimla toy train or Chandigarh Airport). Transfer to your honeymoon hotel. Welcome drink and check-in. Evening romantic walk on Mall Road and Ridge. Visit Christ Church illuminated at night. Special honeymoon cake and dinner arrangements at hotel. Overnight in Shimla.",
      },
      {
        day: 2,
        title: "Shimla Sightseeing & Kufri",
        desc: "After breakfast, half-day excursion to Kufri (30 mins) - enjoy horse riding, yak rides, and visit Himalayan Nature Park. Return to Shimla and visit Jakhu Temple (highest point with panoramic views), Vice Regal Lodge, and Scandal Point. Evening shopping on Mall Road. Special candlelight dinner arranged at hotel/restaurant with valley views.",
      },
      {
        day: 3,
        title: "Shimla to Manali",
        desc: "Check-out after breakfast and drive to Manali (7-8 hours scenic journey through mountains). En-route stop at Sundernagar Lake and Kullu Valley for photos. Arrive in Manali by evening, check-in at your hotel. Evening at leisure to relax after the journey. Romantic dinner at hotel.",
      },
      {
        day: 4,
        title: "Manali - Solang Valley & Local Sightseeing",
        desc: "Morning visit to Solang Valley for adventure activities - paragliding, zorbing (at own cost). Return to Manali and visit Hadimba Temple surrounded by cedar forests, Manu Temple, and Vashisht hot water springs. Evening stroll at Mall Road. Special honeymoon photography session arranged (complimentary). Private dinner with mountain views.",
      },
      {
        day: 5,
        title: "Departure from Manali",
        desc: "Enjoy leisurely breakfast. If time permits, visit nearby Van Vihar or do last-minute shopping for Kullu shawls and local handicrafts. Check-out and transfer to Bhuntar Airport or Manali bus stand for your onward journey. Depart with sweet memories of your romantic Himachal honeymoon!",
      },
    ],
  },
  {
    id: "8",
    title: "Mysore Coorg Getaway",
    destination: "Mysore, Coorg",
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
    ],
    duration: { days: 4, nights: 3 },
    price: 19000,
    rating: 4.6,
    reviewCount: 134,
    theme: ["Nature", "Heritage"],
    inclusions: ["Hotel", "Breakfast", "Transfers", "Sightseeing"],
    highlights: [
      "Mysore Palace",
      "Coffee plantations",
      "Abbey Falls",
      "Raja's Seat",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Mysore",
        desc: "Arrive at Bangalore Airport/Railway Station and drive to Mysore (3.5 hours). Check-in at hotel and freshen up. After lunch, visit the magnificent Mysore Palace (illuminated on Sundays and festival days), St. Philomena's Church, and Chamundi Hills with Nandi statue. Evening stroll through Devaraja Market. Overnight in Mysore.",
      },
      {
        day: 2,
        title: "Mysore Sightseeing & Drive to Coorg",
        desc: "After breakfast, visit Mysore Zoo (one of India's best), Brindavan Gardens with musical fountain. Check-out and drive to Coorg (3 hours) - the Scotland of India. En-route visit Tibetan Golden Temple at Bylakuppe. Arrive in Coorg, check-in at plantation homestay/resort. Evening at leisure enjoying the coffee aroma. Overnight in Coorg.",
      },
      {
        day: 3,
        title: "Coorg Exploration",
        desc: "Full day to explore beautiful Coorg. Visit Abbey Falls cascading through coffee plantations, Raja's Seat viewpoint for stunning valley views, Omkareshwara Temple, and Madikeri Fort. Take a guided walk through coffee and spice plantations - learn about coffee processing. Optional visit to Dubare Elephant Camp. Evening enjoy bonfire and traditional Coorgi dinner. Overnight in Coorg.",
      },
      {
        day: 4,
        title: "Departure",
        desc: "Early morning optional visit to Talacauvery (source of River Cauvery) or Bhagamandala. After breakfast, check-out and drive back to Bangalore/Mysore for your onward journey. Shop for Coorg coffee, homemade chocolates, and honey. Depart with refreshing memories of nature's paradise!",
      },
    ],
  },
  {
    id: "9",
    title: "Varanasi Spiritual Tour",
    destination: "Varanasi, Uttar Pradesh",
    images: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800"],
    duration: { days: 3, nights: 2 },
    price: 15000,
    rating: 4.8,
    reviewCount: 201,
    theme: ["Spiritual", "Culture"],
    inclusions: ["Hotel", "Breakfast", "Boat ride", "Guide"],
    highlights: ["Ganga Aarti", "Sarnath", "Kashi Vishwanath", "Boat ride"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Evening Ganga Aarti",
        desc: "Arrive at Varanasi Airport/Railway Station. Meet our representative and transfer to hotel on the ghats. After check-in and lunch, visit Banaras Hindu University (BHU) and Bharat Kala Bhavan Museum. In the evening, witness the spectacular Ganga Aarti at Dashashwamedh Ghat - a mesmerizing ritual with lamps, bells, and chants. Explore the narrow lanes of old Varanasi. Overnight at hotel.",
      },
      {
        day: 2,
        title: "Sunrise Boat Ride & Sarnath",
        desc: "Early morning boat ride on the holy Ganges River during sunrise - witness the ghats come alive with pilgrims bathing, priests performing rituals, and the ancient city awakening. Visit the main ghats including Manikarnika (cremation ghat), Assi Ghat, and others. Return to hotel for breakfast. After breakfast, excursion to Sarnath (10 km) - where Lord Buddha gave his first sermon. Visit Dhamek Stupa, Sarnath Museum, and Mulagandha Kuti Vihar temple with beautiful frescoes. Evening free for shopping - famous for Banarasi silk sarees, wooden toys, and brassware. Optional: Attend evening aarti at Assi Ghat.",
      },
      {
        day: 3,
        title: "Temple Visit & Departure",
        desc: "After breakfast, visit the sacred Kashi Vishwanath Temple (one of 12 Jyotirlingas), Sankat Mochan Hanuman Temple, Durga Temple (Monkey Temple), and Tulsi Manas Temple. Experience a walk through the labyrinthine alleys of Varanasi. Visit a silk weaving center to see artisans at work. Depending on your departure time, optional visit to Ramnagar Fort. Check-out and transfer to airport/station for departure. Leave with spiritual blessings and cultural richness of the eternal city!",
      },
    ],
  },
];

const THEME_FILTERS = [
  "All",
  "Beach",
  "Adventure",
  "Heritage",
  "Wellness",
  "Mountains",
  "Wildlife",
  "Honeymoon",
  "Family",
];

const inclusionIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Flights: Plane,
  Hotels: HotelIcon,
  Hotel: HotelIcon,
  Accommodation: HotelIcon,
  Transfers: Car,
  Meals: UtensilsCrossed,
  Breakfast: UtensilsCrossed,
};

interface HolidaysPageProps {
  onPackageSelect?: (pkg: Package, metadata?: { guests?: number }) => void;
}

export function HolidaysPage({ onPackageSelect }: HolidaysPageProps) {
  const [packages] = useState(MOCK_PACKAGES);
  const [activeTheme, setActiveTheme] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Filter packages by theme
  const filteredPackages =
    activeTheme === "All"
      ? packages
      : packages.filter((pkg) => pkg.theme?.includes(activeTheme));

  // Show detail page if a package is selected
  if (selectedPackage) {
    return (
      <PackageDetailPage
        packageData={selectedPackage}
        onBack={() => setSelectedPackage(null)}
        onBook={() => {
          if (onPackageSelect) {
            onPackageSelect(selectedPackage, { guests: 2 }); // Default 2 guests, can be made dynamic
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            Holiday Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90"
          >
            Curated experiences for every traveler
          </motion.p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {THEME_FILTERS.map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTheme === theme
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredPackages.length} Packages Available
          </h2>
          <p className="text-gray-600 mt-1">
            Discover handpicked holiday packages across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              index={index}
              onSelect={() => setSelectedPackage(pkg)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PackageCardProps {
  package: Package;
  index: number;
  onSelect?: () => void;
}

function PackageCard({ package: pkg, index, onSelect }: PackageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const packageImage = pkg.images?.[0] || pkg.image || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => onSelect?.()}
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={packageImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white rounded-full transition-colors z-10 shadow-lg"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>

        {/* Theme Badges */}
        {pkg.theme && pkg.theme.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {pkg.theme.slice(0, 2).map((theme) => (
              <Badge
                key={theme}
                variant="default"
                className="backdrop-blur-sm bg-blue-600/90"
              >
                {theme}
              </Badge>
            ))}
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm opacity-90">{pkg.destination}</span>
          </div>

          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
            {pkg.title}
          </h3>

          <div className="flex items-center gap-4 text-sm mb-4 opacity-90">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{pkg.duration.days}D</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Moon className="h-4 w-4" />
              <span>{pkg.duration.nights}N</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4" />
              <span>
                From ₹{(pkg.price || pkg.pricePerPerson || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Rating */}
          {pkg.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-400/90 px-2.5 py-1 rounded-lg">
                <Star className="h-3.5 w-3.5 fill-yellow-900 text-yellow-900" />
                <span className="text-sm font-semibold text-yellow-900">
                  {pkg.rating}
                </span>
              </div>
              <span className="text-xs opacity-80">
                ({pkg.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="p-5 space-y-4">
        {/* Inclusions */}
        {pkg.inclusions && pkg.inclusions.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
              Inclusions
            </p>
            <div className="flex flex-wrap gap-2">
              {pkg.inclusions.slice(0, 4).map((inclusion, idx) => {
                const Icon = inclusionIcons[inclusion] || Plane;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {inclusion}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Highlights */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
              Highlights
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Book Now Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
