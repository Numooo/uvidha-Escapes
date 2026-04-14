const fs = require('fs');
const path = require('path');

const locales = ['ru', 'en'];
const dataDir = path.join(__dirname, '../src/i18n/messages');

const corporateData = {
  ru: {
    "title": "Корпоративный кабинет",
    "welcome": "Добро пожаловать",
    "tabs": {
      "dashboard": "Дашборд",
      "employees": "Сотрудники",
      "bookings": "Бронирования",
      "billing": "Оплата и счета",
      "settings": "Настройки компании"
    },
    "stats": {
      "totalSpent": "Общий расход",
      "activeTravelers": "Активные сотрудники",
      "monthlyBudget": "Месячный бюджет",
      "savings": "Экономия за квартал",
      "expenditureByDept": "Расходы по отделам"
    },
    "employees": {
      "add": "Добавить сотрудника",
      "search": "Поиск сотрудников...",
      "name": "ФИО",
      "role": "Роль",
      "dept": "Отдел",
      "spent": "Потрачено",
      "trips": "Поездок",
      "status": "Статус",
      "active": "Активен",
      "onTrip": "В поездке",
      "inactive": "Неактивен"
    },
    "billing": {
      "invoiceId": "Счет №",
      "date": "Дата",
      "amount": "Сумма",
      "status": "Статус",
      "download": "Скачать PDF",
      "paid": "Оплачен",
      "pending": "Ожидает"
    }
  },
  en: {
    "title": "Corporate Cabinet",
    "welcome": "Welcome",
    "tabs": {
      "dashboard": "Dashboard",
      "employees": "Employees",
      "bookings": "Bookings",
      "billing": "Billing & Invoices",
      "settings": "Company Settings"
    },
    "stats": {
      "totalSpent": "Total Spent",
      "activeTravelers": "Active Travelers",
      "monthlyBudget": "Monthly Budget",
      "savings": "Quarterly Savings",
      "expenditureByDept": "Expenditure by Dept"
    },
    "employees": {
      "add": "Add Employee",
      "search": "Search employees...",
      "name": "Full Name",
      "role": "Role",
      "dept": "Dept",
      "spent": "Spent",
      "trips": "Trips",
      "status": "Status",
      "active": "Active",
      "onTrip": "On Trip",
      "inactive": "Inactive"
    },
    "billing": {
      "invoiceId": "Invoice #",
      "date": "Date",
      "amount": "Amount",
      "status": "Status",
      "download": "Download PDF",
      "paid": "Paid",
      "pending": "Pending"
    }
  }
};

locales.forEach(lang => {
  const filePath = path.join(dataDir, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    content.Corporate = corporateData[lang];
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`Updated ${lang}.json`);
  } else {
    console.error(`${lang}.json not found at ${filePath}`);
  }
});
