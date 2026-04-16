const fs = require('fs');
const path = require('path');

const visaDetail = {
  "back": "Артка",
  "notFound": "Виза талаптары табылган жок",
  "backToServices": "Виза кызматтарына кайтуу",
  "thankYou": "Рахмат! Сиздин арызыңыз кабыл алынды, жакында сиз менен байланышабыз.",
  "documentRequirements": "Керектүү документтер",
  "itemsCount": "{count} пункт",
  "processingTimeline": "Тариздөө этаптары",
  "feesBreakdown": "Баанын чоо-жайы",
  "importantInformation": "Маанилүү маалымат",
  "faqs": "Көп берилүүчү суроолор",
  "bookNow": "Виза тариздөө",
  "enquiryTitle": "Суроо берүү",
  "helpTitle": "Кеңеш керекпи?",
  "timeline": {
    "step1": { "title": "Консультация", "desc": "Документтерди алдын ала текшерүү жана виза түрүн тандоо" },
    "step2": { "title": "Даярдоо", "desc": "Анкеталарды толтуруу жана документтерди которуу" },
    "step3": { "title": "Тапшыруу", "desc": "Консулдукка жазылуу жана документтерди тапшыруу" },
    "step4": { "title": "Кароо", "desc": "Консулдук бөлүмдүн чечимин күтүү" },
    "step5": { "title": "Алуу", "desc": "Даяр визаны жана документтерди берүү" }
  },
  "fees": {
    "embassy": "Консулдук жыйым",
    "service": "Борбордун тейлөө акысы",
    "processing": "Агенттиктин кызматтары",
    "total": "Төлөнүүчү жалпы сумма"
  },
  "info": {
    "approval": { "title": "Тапшыруу кепилдиги", "desc": "Биз документтердин тапшырууга туура даярдалышына кепилдик беребиз" },
    "validity": { "title": "Аракет мөөнөтү", "desc": "Визанын мөөнөтү консулдук тарабынан белгиленет" },
    "format": { "title": "Сүрөткө талаптар", "desc": "Сүрөт ачык фондо, көз айнексиз жана баш кийимсиз болушу керек" },
    "delivery": { "title": "Жеткирүү", "desc": "Биз документтериңизди алгандан кийин курьер аркылуу жеткиребиз" }
  },
  "faqsList": [
    { "q": "Жеке катышуу керекпи?", "a": "Бул өлкөгө жараша болот. Көпчүлүк өлкөлөр биометрикалык маалыматтарды (манжа изин) тапшырууну талап кылат." },
    { "q": "Виза алуу мүмкүнчүлүгү кандай?", "a": "Чечимди ар дайым консул кабыл алат, бирок биз баш тартуу тобокелдигин максималдуу түрдө азайтабыз." },
    { "q": "Баш тартылган учурда акча кайтарылабы?", "a": "Консулдук жана тейлөө жыйымдары кайтарылбайт, агенттиктин кызмат акысы тандалган тарифке жараша болот." }
  ],
  "trust": {
    "expertAssistance": "Эксперттик жардам 24/7",
    "verification": "Документтерди адис тарабынан текшерүү",
    "tracking": "Арыздын абалын көзөмөлдөө",
    "secure": "Маалыматтардын коопсуз сакталышы",
    "secureTitle": "Ишенимдүү өнөктөш",
    "stats": "Жыл сайын 10,000ден ашык ийгиликтүү берилген визалар"
  },
  "labels": {
    "perApplicant": "бир арыз ээси үчүн",
    "workingHours": "Дүй-Жум: 09:00 - 18:00, Иш: 10:00 - 14:00"
  },
  "form": {
    "name": "Сиздин атыңыз",
    "email": "Email",
    "phone": "Телефон",
    "travelDate": "Саякаттын пландалган күнү",
    "message": "Сиздин билдирүүңүз",
    "cancel": "Жокко чыгаруу",
    "submit": "Арыз жөнөтүү"
  }
};

const filePath = path.join(__dirname, '../src/i18n/messages/kg.json');
console.log('Final path:', filePath);
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
data.VisaDetail = visaDetail;
console.log('Keys before:', Object.keys(data).length);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
const dataAfter = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log('Keys after:', Object.keys(dataAfter).length);
console.log('kg.json updated');
