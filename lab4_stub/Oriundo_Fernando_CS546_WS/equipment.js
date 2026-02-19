//export the following functions using ES6 syntax
import { equipment as equipmentCollection } from '../config/mongoCollections.js';
import {
  checkString,
  checkId,
  objectIdToString,
  deepTrimEquipment,
  validateName,
  validateCategory,
  validateLocation,
  validateNotes,
  validateAssetObject,
  validateManufacturer,
  validateModelNumber,
  validateSerialNumber,
  validateReplacementCost,
  validateAcquiredOn
} from '../helpers.js';

export const createEquipmentItem = async (name, category, location, notes, asset) => {
  let { tName, tCategory, tLocation, tNotes, tAsset } = deepTrimEquipment(
    name,
    category,
    location,
    notes,
    asset
  );

  validateName(tName);
  validateCategory(tCategory);
  validateLocation(tLocation);
  validateNotes(tNotes);
  validateAssetObject(tAsset);

  let manufacturer = validateManufacturer(tAsset.manufacturer);
  let modelNumber = validateModelNumber(tAsset.modelNumber);
  let serialNumber = validateSerialNumber(tAsset.serialNumber);
  let replacementCost = validateReplacementCost(tAsset.replacementCost);
  let acquiredOn = validateAcquiredOn(tAsset.acquiredOn);

  let col = await equipmentCollection();

  let existingName = await col.findOne({
    name: { $regex: `^${escapeRegex(tName)}$`, $options: 'i' }
  });
  if (existingName) throw 'An equipment item with that name already exists';

  let existingSerial = await col.findOne({
    'asset.serialNumber': { $regex: `^${escapeRegex(serialNumber)}$`, $options: 'i' }
  });
  if (existingSerial) throw 'An equipment item with that serialNumber already exists';

  let newItem = {
    name: tName,
    category: tCategory,
    status: 'available',
    location: tLocation,
    notes: tNotes,
    asset: {
      manufacturer,
      modelNumber,
      serialNumber,
      replacementCost,
      acquiredOn
    }
  };

  let insertInfo = await col.insertOne(newItem);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add equipment item';

  let created = await col.findOne({ _id: insertInfo.insertedId });
  return objectIdToString(created);
};

export const getAllEquipmentItems = async () => {
  let col = await equipmentCollection();
  let items = await col.find({}).toArray();
  return items.map(objectIdToString);
};

export const getEquipmentById = async (id) => {
  let objId = checkId(id);
  let col = await equipmentCollection();
  let item = await col.findOne({ _id: objId });

  if (!item) throw 'No equipment item with that id';
  return objectIdToString(item);
};

export const removeEquipmentItem = async (id) => {
  let objId = checkId(id);
  let col = await equipmentCollection();

  let item = await col.findOne({ _id: objId });
  if (!item) throw 'Could not delete equipment item';

  let delResult = await col.deleteOne({ _id: objId });
  if (delResult.deletedCount === 0) throw 'Could not delete equipment item';

  return { name: item.name, deleted: true };
};

export const updateEquipmentLocation = async (id, newLocation) => {
  let objId = checkId(id);
  let trimmedNewLoc = checkString(newLocation, 'newLocation');
  validateLocation(trimmedNewLoc);

  let col = await equipmentCollection();
  let current = await col.findOne({ _id: objId });

  if (!current) throw 'No equipment item with that id';

  if (current.location && current.location.toLowerCase() === trimmedNewLoc.toLowerCase()) {
    throw 'newLocation must be different from the current location';
  }

  let updateInfo = await col.updateOne(
    { _id: objId },
    { $set: { location: trimmedNewLoc } }
  );

  if (updateInfo.matchedCount === 0) throw 'Could not update equipment item';

  let updated = await col.findOne({ _id: objId });
  return objectIdToString(updated);
};

let escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
