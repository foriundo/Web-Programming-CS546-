/*

For your app.js file, you will:

Create an equipment item of your choice.
Log the newly created equipment item. (Just that equipment item, not all equipment items)
Create another equipment item of your choice.
Query all equipment items, and log them all
Create the 3rd equipment item of your choice.
Log the newly created 3rd equipment item. (Just that equipment item, not all equipment items)
Move the location of the first equipment item
Log the first equipment item with the updated location.
Remove the second equipment item you created.
Query all equipment items, and log them all
Try to create an equipment item with bad input parameters to make sure it throws errors.
Try to remove an equipment item that does not exist to make sure it throws errors.
Try to change the location for an equipment item that does not exist to make sure it throws errors.
Try to change the location for an equipment item passing in invalid data for the newLocation parameter to make sure it throws errors.
Try getting an equipment item by ID that does not exist to make sure it throws errors.

*/
import * as equipment from './data/equipment.js';

let main = async () => {
  let item1, item2, item3;

  try {
    item1 = await equipment.createEquipmentItem(
      'Canon EOS R50 Camera',
      'camera',
      'Media Lab - Cabinet 2',
      'Lens included.',
      {
        manufacturer: 'Canon',
        modelNumber: 'R50',
        serialNumber: 'CAN-R50-00001234',
        replacementCost: 679.99,
        acquiredOn: '11/03/2023'
      }
    );
    console.log('Created item 1:', item1);
  } catch (e) {
    console.log('Create item 1 error:', e);
  }

  try {
    item2 = await equipment.createEquipmentItem(
      'Rode VideoMic GO II',
      'audio',
      'Media Lab - Drawer 1',
      '   ',
      {
        manufacturer: 'Rode',
        modelNumber: 'VMGOII',
        serialNumber: 'RODE-VMGOII-778899',
        replacementCost: '99.99',
        acquiredOn: '02/10/2022'
      }
    );
    console.log('Created item 2:', item2);
  } catch (e) {
    console.log('Create item 2 error:', e);
  }

  try {
    let all1 = await equipment.getAllEquipmentItems();
    console.log('All equipment after 2 inserts:', all1);
  } catch (e) {
    console.log('Get all error:', e);
  }

  try {
    item3 = await equipment.createEquipmentItem(
      'Dell XPS 13 Laptop',
      'laptop',
      'Media Lab - Shelf C',
      '',
      {
        manufacturer: 'Dell',
        modelNumber: 'XPS-13',
        serialNumber: 'DELL-XPS13-2020-0007',
        replacementCost: 999.0,
        acquiredOn: '07/21/2020'
      }
    );
    console.log('Created item 3:', item3);
  } catch (e) {
    console.log('Create item 3 error:', e);
  }

  if (item1) {
    try {
      let moved = await equipment.updateEquipmentLocation(item1._id, 'Media Lab - Locked Cage 1');
      console.log('Moved item 1:', moved);
    } catch (e) {
      console.log('Move item 1 error:', e);
    }
  } else {
    console.log('Skipping move: item1 was not created.');
  }

  if (item2) {
    try {
      let removed = await equipment.removeEquipmentItem(item2._id);
      console.log('Removed item 2:', removed);
    } catch (e) {
      console.log('Remove item 2 error:', e);
    }
  } else {
    console.log('Skipping remove: item2 was not created.');
  }

  try {
    let all2 = await equipment.getAllEquipmentItems();
    console.log('All equipment after removal:', all2);
  } catch (e) {
    console.log('Get all error:', e);
  }

  try {
    await equipment.createEquipmentItem(
      '!!bad name!!',
      'camera',
      'Media Lab - Shelf Z',
      'ok',
      {
        manufacturer: 'Canon',
        modelNumber: 'R50',
        serialNumber: 'CAN-R50-UNIQUE-99999',
        replacementCost: 10,
        acquiredOn: '11/03/2023'
      }
    );
  } catch (e) {
    console.log('Expected create error:', e);
  }

  try {
    await equipment.removeEquipmentItem('6520a3a18f1a4c3d9a2f1999');
  } catch (e) {
    console.log('Expected remove non-existent error:', e);
  }

  try {
    await equipment.updateEquipmentLocation('6520a3a18f1a4c3d9a2f1999', 'Media Lab - Shelf D');
  } catch (e) {
    console.log('Expected update non-existent error:', e);
  }

  if (item1) {
    try {
      await equipment.updateEquipmentLocation(item1._id, '@@@');
    } catch (e) {
      console.log('Expected update invalid location error:', e);
    }
  } else {
    console.log('Skipping invalid-location test: item1 was not created.');
  }

  try {
    await equipment.getEquipmentById('6520a3a18f1a4c3d9a2f1999');
  } catch (e) {
    console.log('Expected getById non-existent error:', e);
  }
};

await main();
