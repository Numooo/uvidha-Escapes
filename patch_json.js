const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'messages/en.json');
const ruPath = path.join(__dirname, 'messages/ru.json');

const patchJson = (filePath, updates) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.Search) data.Search = {};
  if (!data.Search.tabs) data.Search.tabs = {};
  
  data.Search.tabs.cargo = updates.tab;
  data.Search.cargo = updates.searchCargo;
  data.Cargo = updates.cargoData;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

patchJson(enPath, {
  tab: "Cargo",
  searchCargo: {
    "from": "Origin",
    "to": "Destination",
    "date": "Shipping Date",
    "weight": "Weight (kg)",
    "type": "Cargo Type",
    "types": {
      "standard": "Standard",
      "fragile": "Fragile",
      "hazardous": "Hazardous",
      "refrigerated": "Refrigerated"
    },
    "search": "Find Transport"
  },
  cargoData: {
    "title": "Cargo & Logistics",
    "subtitle": "Reliable and fast freight solutions",
    "comingSoon": "Coming Soon",
    "trackingTitle": "Track Your Shipment",
    "trackingPlaceholder": "Enter tracking number (e.g. TRK123456789)...",
    "trackBtn": "Track",
    "servicesTitle": "Our Freight Services",
    "services": [
      {
        "title": "Road Freight",
        "desc": "Cost-effective ground shipping across the country with real-time tracking.",
        "icon": "truck"
      },
      {
        "title": "Air Freight",
        "desc": "Fastest delivery options for urgent and time-sensitive shipments globally.",
        "icon": "plane"
      },
      {
        "title": "Ocean Freight",
        "desc": "Economical shipping for large volume international cargo and containers.",
        "icon": "ship"
      }
    ],
    "bookNow": "Request Quote"
  }
});

patchJson(ruPath, {
  tab: "Грузоперевозки",
  searchCargo: {
    "from": "Откуда",
    "to": "Куда",
    "date": "Дата отправки",
    "weight": "Вес (кг)",
    "type": "Тип груза",
    "types": {
      "standard": "Стандартный",
      "fragile": "Хрупкий",
      "hazardous": "Опасный",
      "refrigerated": "С темп. режимом"
    },
    "search": "Найти транспорт"
  },
  cargoData: {
    "title": "Грузоперевозки и логистика",
    "subtitle": "Надежные транспортные решения для вашего бизнеса",
    "comingSoon": "Скоро",
    "trackingTitle": "Отследить ваш груз",
    "trackingPlaceholder": "Введите номер отслеживания (напр. TRK123456789)...",
    "trackBtn": "Найти",
    "servicesTitle": "Наши транспортные услуги",
    "services": [
      {
        "title": "Автомобильные перевозки",
        "desc": "Экономичная наземная доставка по стране с отслеживанием в реальном времени.",
        "icon": "truck"
      },
      {
        "title": "Авиаперевозки",
        "desc": "Самые быстрые варианты доставки для срочных международных отправлений.",
        "icon": "plane"
      },
      {
        "title": "Морские перевозки",
        "desc": "Выгодные решения для крупных партий и контейнерных перевозок.",
        "icon": "ship"
      }
    ],
    "bookNow": "Запросить расчет"
  }
});

console.log("Successfully patched JSON files!");
