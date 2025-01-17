export enum modalType {
  New = 'New',
  Edit = 'Edit',
  Delete = 'Delete',
  Export = 'Export',
  Import = 'Import',
  Close = 'Close',
  Preview = 'Preview',
  History = 'History',
  Merge = 'Merge',
  Receive = 'Receive',
  Void = 'Void',
  Cancel = 'Cancel',
  Remove = 'Remove',
  Variation = 'Variation',
  ImportExportSummary = 'ImportExportSummary',
  Activate = 'Activate',
  Add = 'Add',
  Configure = 'Configure',

  // products
  AdjustMasterSKU = 'AdjustMasterSKU',
  CoreProduct = 'CoreProduct',
  BundleKit = 'BundleKit',
  ImportVendorProducts = 'ImportVendorProducts',
  ImportVendorProductsByVendor = 'ImportVendorProductsByVendor',
  ImportVendorProductsAll = 'ImportVendorProductsAll',
  ImportSKUAdjustment = 'ImportSKUAdjustment',
  ImportCustomFields = 'ImportCustomFields',
  ExportVendorProducts = 'ExportVendorProducts',
  NewVendorProduct = 'NewVendorProduct',
  ProductVariants = 'ProductVariants',
  AttributeGroup = 'AttributeGroup',
  AddCoreProduct = 'AddCoreProduct',
  ConfigAttributeGroups = 'ConfigAttributeGroups',
  ProductVariations = 'ProductVariations',
  BundleKitProduct = 'BundleKitProduct',
  SelectQuantityOfSKU = 'SelectQuantityOfSKU',
  ExportCustomBundleKit = 'ExportCustomBundleKit',
  VirtualProductEdit = 'VirtualProductEdit',
  NewCategory = 'NewCategory',
  ConfigCategory = 'ConfigCategory',

  // order
  ManualOrder = 'Manual Order',
  EditOrder = 'EditOrder',
  CancelOrder = 'CancelOrder',
  RestoreOrder = 'RestoreOrder',
  SelectOrderColumns = 'SelectOrderColumns',
  SplitOrder = 'SplitOrder',
  DuplicateOrder = 'DuplicateOrder',
  NewFieldType = 'NewFieldType',

  ImportOrder = 'ImportOrder',
  OrderImportSettings = 'OrderImportSettings',
  OrderExportSettings = 'OrderExportSettings',
  AddOrderImportSettings = 'AddOrderImportSettings',
  AddOrderExportSettings = 'AddOrderExportSettings',

  ExportOrder = 'ExportOrder',
  ExportQueueOrder = 'ExportQueueOrder',

  ImportOrderShipments = 'ImportOrderShipments',
  ShipmentImportMapping = 'ShipmentImportMapping',
  NewShipmentImportMapping = 'NewShipmentImportMapping',

  ShippingQueueSummary = 'ShippingQueueSummary',
  ExternalShipment = 'ExternalShipment',

  StockTransferFirstStep = 'StockTransferFirstStep',
  StockTransferSecondStep = 'StockTransferSecondStep',
  CreateRMA = 'CreateRMA',
  MarkOrdersPaid = 'MarkOrdersPaid',

  // inventory
  StockHistory = 'StockHistory',
  StockDeactive = 'StockDeactive',
  StockDrawRank = 'StockDrawRank',
  StockLocationChange = 'StockLocationChange',
  StockLocationTransfer = 'StockLocationTransfer',
  StockAdjust = 'StockAdjust',
  StockEdit = 'StockEdit',
  ExportStockEditHistory = 'ExportStockEditHistory',
  ExportStockDetails = 'ExportStockDetails',
  ExportInventory = 'ExportInventory',
  BulkReconciliation = 'BulkReconciliation',
  StockAllocationDetails = 'StockAllocationDetails',
  ImportReorderRules = 'ImportReorderRules',
  InventoryRules = 'InventoryRules',
  SelectWarehouseForInventoryImport = 'SelectWarehouseForInventoryImport',
  IncomingUnits = 'IncomingUnits',
  NewStock = 'NewStock',
  ReceiveTransferOrder = 'ReceiveTransferOrder',

  // Purchasing
  ManagePurchaseOrders = 'Manage',
  ExportPOSettings = 'ExportPOSetings',
  ConfigureMilestones = 'ConfigureMilestones',
  ManageMilestones = 'ManageMilestones',
  AddNewPo = 'AddNewPo',

  // Shipments
  ExportRmas = 'ExportRmas',
  ExportShipments = 'ExportShipments',
  VoidShipments = 'VoidShipments',
  ReturnItems = 'ReturnItems',

  // warehouse
  WarehouseBasicInfo = 'WarehouseBasicInfo',
  WarehouseReturnLocation = 'WarehouseReturnLocation',
  WarehouseShippingZones = 'WarehouseShippingZones',
  DocumentPrintSettings = 'DocumentPrintSettings',
  RankOrder = 'RankOrder',
  WarehouseDeactivate = 'WarehouseDeactivate',
  WarehouseHistory = 'WarehouseHistory',

  // Discounts
  SelectDiscountType = 'SelectDiscountType',
  AmountOffProducts = 'AmountOffProducts',
  AmountOffOrder = 'AmountOffOrder',
  BuyXGetY = 'BuyXGetY',
  FreeShipping = 'FreeShipping',

  //toolbar
  SKUAlerts = 'SKUAlerts',
}

export enum EPOStatus {
  AAuth = '0',
  AConfirm = '1',
  ARAuth = '2',
  ADelivery = '3',
  ADelivered = '4',
  PDelivery = '5',
  PDelivered = '6',
  Fulfilled = '7',
  Closed = '8',
  Voided = '9',
  Canceled = '10',
}

export enum productType {
  CoreProduct = 'Core',
  VariationCoreProduct = 'Variation Core Product',
  BundleOrKit = 'Bundle/Kit',
  VirtualProduct = 'Virtual Product',
  Variations = 'Variation',
}

export enum productStatus {
  yellow = 'yellow',
  green = 'green',
  red = 'red',
  lightBlue = 'light blue',
}

export enum skuAlertsType {
  WARNING = 'Warning',
  INFO = 'Info',
}
