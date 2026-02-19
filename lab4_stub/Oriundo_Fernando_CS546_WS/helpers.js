//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from 'mongodb';

export let trimIfString = (val) => (typeof val === 'string' ? val.trim() : val);

export let checkString = (val, varName, { allowEmpty = false } = {}) => {
  if (val === undefined) throw `${varName} must be provided`;
  if (typeof val !== 'string') throw `${varName} must be a string`;
  let trimmed = val.trim();
  if (!allowEmpty && trimmed.length === 0)
    throw `${varName} cannot be an empty string or just spaces`;
  return trimmed;
};

export let checkId = (id) => {
  let trimmed = checkString(id, 'id');
  if (!ObjectId.isValid(trimmed)) throw 'id must be a valid ObjectId';
  return ObjectId.createFromHexString(trimmed);
};

export let objectIdToString = (doc) => {
  if (!doc) return doc;
  return { ...doc, _id: doc._id.toString() };
};

export let deepTrimEquipment = (name, category, location, notes, asset) => {
  let tName = checkString(name, 'name');
  let tCategory = checkString(category, 'category').toLowerCase();
  let tLocation = checkString(location, 'location');
  let tNotes = checkString(notes, 'notes', { allowEmpty: true });

  if (asset === undefined) throw 'asset must be provided';
  if (typeof asset !== 'object' || asset === null || Array.isArray(asset))
    throw 'asset must be an object';

  let trimmedAsset = {};
  for (let [k, v] of Object.entries(asset)) {
    trimmedAsset[k] = trimIfString(v);
  }

  return { tName, tCategory, tLocation, tNotes, tAsset: trimmedAsset };
};

export let validateName = (name) => {
  if (name.length < 3 || name.length > 50)
    throw 'name must be between 3 and 50 characters';
  if (!/^[A-Za-z0-9 -]+$/.test(name))
    throw 'name may contain letters, numbers, spaces, and hyphens only';
};

export let validateCategory = (categoryLower) => {
  let allowed = new Set(['camera', 'audio', 'lighting', 'tripod', 'laptop', 'accessory']);
  if (!allowed.has(categoryLower))
    throw 'category must be one of: camera, audio, lighting, tripod, laptop, accessory';
};

export let validateLocation = (location) => {
  if (location.length < 3 || location.length > 100)
    throw 'location must be between 3 and 100 characters';
  if (!/^[A-Za-z0-9 \-:;]+$/.test(location))
    throw 'location may contain letters, numbers, spaces, hyphens, colons, and semi-colons only';
};

export let validateNotes = (notes) => {
  if (typeof notes !== 'string') throw 'notes must be a string';
  if (/(.)\1{4,}/.test(notes))
    throw 'notes cannot contain the same character repeated 5 times or more in a row';
};

export let validateAssetObject = (asset) => {
  let requiredKeys = ['manufacturer', 'modelNumber', 'serialNumber', 'replacementCost', 'acquiredOn'];
  let keys = Object.keys(asset);

  if (keys.length !== requiredKeys.length)
    throw 'asset must have exactly the required keys';

  let sorted = [...keys].sort();
  let sortedReq = [...requiredKeys].sort();

  for (let i = 0; i < sortedReq.length; i++) {
    if (sorted[i] !== sortedReq[i])
      throw 'asset must have ALL and ONLY the following keys: manufacturer, modelNumber, serialNumber, replacementCost, acquiredOn';
  }
};

export let validateManufacturer = (manufacturer) => {
  let m = checkString(manufacturer, 'manufacturer');
  if (m.length < 2 || m.length > 50)
    throw 'manufacturer must be between 2 and 50 characters';
  if (!/^[A-Za-z][A-Za-z0-9 \-]*$/.test(m))
    throw 'manufacturer must start with a letter and contain letters, numbers, spaces, and hyphens only';
  return m;
};

export let validateModelNumber = (modelNumber) => {
  let mn = checkString(modelNumber, 'modelNumber');
  if (mn.length < 2 || mn.length > 30)
    throw 'modelNumber must be between 2 and 30 characters';
  if (!/^[A-Za-z0-9\-]+$/.test(mn))
    throw 'modelNumber may contain letters, numbers, and hyphens only (no spaces)';
  return mn;
};

export let validateSerialNumber = (serialNumber) => {
  let sn = checkString(serialNumber, 'serialNumber');
  if (sn.length < 8 || sn.length > 50)
    throw 'serialNumber must be between 8 and 50 characters';
  if (!/^[A-Z0-9\-]+$/.test(sn))
    throw 'serialNumber may contain uppercase letters, numbers, and hyphens only (no spaces)';
  return sn;
};

export let validateReplacementCost = (replacementCost) => {
  if (replacementCost === undefined) throw 'replacementCost must be provided';

  let num = replacementCost;

  if (typeof num === 'string') {
    num = num.trim();
    if (num.length === 0) throw 'replacementCost must be a valid number > 0';
    num = Number(num);
  }

  if (typeof num !== 'number' || !Number.isFinite(num) || num <= 0)
    throw 'replacementCost must be a finite number > 0';

  return num;
};

let isLeapYear = (year) => (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);

export let validateAcquiredOn = (acquiredOn) => {
  let d = checkString(acquiredOn, 'acquiredOn');

  let match = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/.exec(d);
  if (!match) throw 'acquiredOn must be in "MM/DD/YYYY" format with leading zeros';

  let month = Number(match[1]);
  let day = Number(match[2]);
  let year = Number(match[3]);

  let daysInMonth = [31,(isLeapYear(year) ? 29 : 28),31,30,31,30,31,31,30,31,30,31];

  if (day > daysInMonth[month - 1])
    throw 'acquiredOn must be a valid calendar date';

  return d;
};
