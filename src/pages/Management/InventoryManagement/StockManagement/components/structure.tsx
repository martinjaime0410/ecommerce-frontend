export const data = [
  {
    key: 1,
    type: 'Core Product',
    master_sku: '1234',
    name: 'Water Bottle',
    brand: 'RUTGERS',
    description: '',
    on_hands: '3,934',
    locked: '191',
    allocated: '0',
    in_transfer: '0',
    available: '3,543',
    discrepation: '0',
    status: 'yellow',
  },
  {
    key: 2,
    type: 'Variation Core Product',
    master_sku: 'SUNGLASS...',
    name: 'Sterling Silve...',
    brand: 'PAPER HEART IN...',
    description: '',
    on_hands: '5,174',
    locked: '20',
    allocated: '10',
    in_transfer: '0',
    available: '5,134',
    discrepation: '0',
    status: 'green',
  },
  {
    key: 3,
    type: 'Variations',
    master_sku: '10068902',
    name: 'Sterling Silve...',
    brand: 'YOYO',
    description: '',
    on_hands: '21,497',
    locked: '1,470',
    allocated: '100',
    in_transfer: '25',
    available: '19,913',
    discrepation: '0',
    status: 'red',
  },
  {
    key: 4,
    type: 'Bundle or Kit',
    master_sku: '10068935',
    name: 'Sterling Silve...',
    brand: 'SPOTTIE',
    description: '',
    on_hands: '1,341',
    locked: '0',
    allocated: '1',
    in_transfer: '0',
    available: '1,340',
    discrepation: '0',
    status: 'light blue',
  },
  {
    key: 5,
    type: 'Core Product',
    master_sku: '10069001',
    name: 'Sterling Silve...',
    brand: '',
    description: 'book',
    on_hands: '0',
    locked: '0',
    allocated: '0',
    in_transfer: '0',
    available: '0',
    discrepation: '0',
    status: 'light blue',
  },
  {
    key: 6,
    type: 'Bundle or Kit',
    master_sku: '10069901',
    name: 'Sterling Silve...',
    brand: 'STERLING CO.',
    description: '',
    on_hands: '10',
    locked: '0',
    allocated: '5',
    in_transfer: '0',
    available: '5',
    discrepation: '0',
    status: 'red',
    children: [
      {
        key: 50,
        type: 'Core Product',
        master_sku: '1234',
        name: 'Water Bottle',
        brand: 'RUTGERS',
        description: '',
        on_hands: '3,934',
        locked: '191',
        allocated: '0',
        in_transfer: '0',
        available: '3,543',
        discrepation: '0',
        status: 'yellow',
      },
    ],
  },
  {
    key: 7,
    type: 'Core Product',
    master_sku: 'DICE 2',
    name: 'Sterling Silve...',
    brand: 'KJERRR',
    description: '',
    on_hands: '601',
    locked: '15',
    allocated: '2',
    in_transfer: '0',
    available: '584',
    discrepation: '0',
    status: 'green',
  },
  {
    key: 8,
    type: 'Core Product',
    master_sku: '19076456',
    name: 'Sterling Silve...',
    brand: 'JOKERBRAND 8',
    description: '',
    on_hands: '0',
    locked: '0',
    allocated: '0',
    in_transfer: '0',
    available: '0',
    discrepation: '0',
    status: 'light blue',
  },
  {
    key: 9,
    type: 'Core Product',
    master_sku: '19076457',
    name: 'Sterling Silve...',
    brand: 'JOKERBRAND 8',
    description: '',
    on_hands: '2',
    locked: '0',
    allocated: '0',
    in_transfer: '0',
    available: '2',
    discrepation: '0',
    status: 'green',
  },
  {
    key: 10,
    type: 'Core Product',
    master_sku: '19076458',
    name: 'Sterling Silve...',
    brand: 'JOKERBRAND 8',
    description: '',
    on_hands: '509',
    locked: '2',
    allocated: '3',
    in_transfer: '5',
    available: '504',
    discrepation: '0',
    status: 'yellow',
  },
  {
    key: 11,
    type: 'type1',
    master_sku: 'Spring Bar',
    name: 'Everest Spring Bar',
    brand: 'brand1',
    description: 'description1',
    on_hands: 'on_hands',
    locked: 'locked',
    allocated: '20',
    in_transfer: 'in_transfer',
    available: 'available',
    discrepation: 'discrepation',
    status: 'active',
  },
  {
    key: 12,
    type: 'type2',
    master_sku: 'Buckle',
    name: 'Everest Buckle',
    brand: 'brand2',
    description: 'description2',
    on_hands: 'on_hands',
    locked: 'locked',
    allocated: '40',
    in_transfer: 'in_transfer',
    available: 'available',
    discrepation: 'discrepation',
    status: 'active',
  },
  {
    key: 13,
    type: 'type1',
    master_sku: 'Black Rubber Strap',
    name: 'Everest Strap (Black Rubber)',
    brand: 'brand1',
    description: 'description1',
    on_hands: 'on_hands',
    locked: 'locked',
    allocated: '50',
    in_transfer: 'in_transfer',
    available: 'available',
    discrepation: 'discrepation',
    status: 'active',
  },
  {
    key: 14,
    type: 'type2',
    master_sku: 'Rudysku_4',
    name: 'Toys',
    brand: 'brand2',
    description: 'description2',
    on_hands: 'on_hands',
    locked: 'locked',
    allocated: '60',
    in_transfer: 'in_transfer',
    available: 'available',
    discrepation: 'discrepation',
    status: 'active',
  },
  {
    key: 15,
    type: 'type2',
    master_sku: '222',
    name: 'product2',
    brand: 'brand2',
    description: 'description2',
    on_hands: 'on_hands',
    locked: 'locked',
    allocated: '80',
    in_transfer: 'in_transfer',
    available: 'available',
    discrepation: 'discrepation',
    status: 'active',
  },
];

export const stock_data = [
  {
    key: 1,
    location: 'Location 1',
    status: 'Active',
    rank: '1',
    min_level: '2',
    available: '100',
  },
  {
    key: 2,
    location: 'Location 2',
    status: 'Active',
    rank: '2',
    min_level: '3',
    available: '200',
  },
  {
    key: 3,
    location: 'Location 3',
    status: 'Active',
    rank: '3',
    min_level: '2',
    available: '200',
  },
];

export const stock_history = [
  {
    key: 1,
    edit_time: '04/09/2021 10:49 AM',
    user: 'support@skubana.com',
    edit_type: 'Adjust',
    description: 'This is test',
    notes: 'Test',
  },
  {
    key: 2,
    edit_time: '04/09/2022',
    user: 'support@test.com',
    edit_type: 'Adjust sf',
    description: 'This is test dv',
    notes: 'Test s',
  },
  {
    key: 3,
    edit_time: '04/09/2022',
    user: 'support23@test.com',
    edit_type: 'Adjust w3',
    description: 'This is test 34',
    notes: 'Test 34',
  },
];

export const location_history = [
  {
    key: 1,
    edit_time: '04/01/2021 10:49 AM',
    user: 'support@skubana.com',
    edit_type: 'Adjust',
    description:
      'Initial On Hand: 1000011 \nNew on Hand: 1000011 \n Initial Locked: 180 \nNew Locked: 0\nInitial Min. Stock:2\nNew Min.Stock:2',
    notes: '',
  },
  {
    key: 2,
    edit_time: '04/01/2021 10:49 AM',
    user: 'support@test.com',
    edit_type: 'Adjust',
    description:
      'Initial On Hand: 1000011 \nNew on Hand: 1000011 \n New Locked: 0\nInitial Locked: 180 \nInitial Min. Stock:2\nNew Min.Stock:2',
    notes: '',
  },
  {
    key: 3,
    edit_time: '04/01/2021 10:50 AM',
    user: 'Skubana',
    edit_type: 'Remove',
    description: 'Initial On Hand: 1000012 \nQuantity Duducted: 1\n New On Hand: 1000011',
    notes: '',
  },
  {
    key: 4,
    edit_time: '04/01/2021 10:50 AM',
    user: 'Skubana',
    edit_type: 'Remove',
    description:
      'Quantity Duducted: 1\n New On Hand: 1000012\n Initial On Hand: 1000013\n New On Hand: 1000013\n ',
    notes: '',
  },
  {
    key: 5,
    edit_time: '04/01/2021 10:50 AM',
    user: '',
    edit_type: 'Adjust',
    description: 'Initial On Hand: 1000013\n New On Hand: 1000013\n Initial Locked: 0',
    notes: 'Order IP25chardot Shipped',
  },
];

export const stock_allocation = [
  {
    key: 1,
    warehouse: 'Jeff Warehouse',
    stock_location: 'Location 1',
    order_number: 'Stock transfer 1',
    allocated: '20',
    picked: '0',
  },
  {
    key: 2,
    warehouse: 'Jeff Warehouse 2',
    stock_location: 'Location 2',
    order_number: 'Stock transfer 2',
    allocated: '50',
    picked: '0',
  },
  {
    key: 3,
    warehouse: 'Jeff Warehouse 3',
    stock_location: 'Location 3',
    order_number: 'Stock transfer 3',
    allocated: '80',
    picked: '0',
  },
];
