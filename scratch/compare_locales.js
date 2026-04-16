const fs = require('fs');

const ru = JSON.parse(fs.readFileSync('src/i18n/messages/ru.json', 'utf8'));
const kg = JSON.parse(fs.readFileSync('src/i18n/messages/kg.json', 'utf8'));

function findMissing(obj1, obj2, path = '') {
  let missing = [];
  for (let key in obj1) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in obj2)) {
      missing.push(currentPath);
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null && !Array.isArray(obj1[key])) {
      missing = missing.concat(findMissing(obj1[key], obj2[key], currentPath));
    }
  }
  return missing;
}

const missing = findMissing(ru, kg);
console.log('Missing keys in kg.json:', missing);
