﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/dashboard',
    component: './Dashboard',
    title: 'menu.dashboard',
  },
  {
    path: '/orders',
    component: './Management/OrderManagement',
    title: 'menu.orders',
    key: 'orders',
    access: 'routeFilter',
  },
  {
    path: '/inventory',
    component: './Management/InventoryManagement',
    title: 'menu.inventory',
    key: 'inventory',
    access: 'routeFilter',
  },
  {
    path: '/purchasing',
    component: './Management/PurchaseOrderManagement',
    title: 'menu.purchasing',
    key: 'purchase_orders',
    access: 'routeFilter',
  },
  {
    path: '/shipments',
    component: './Management/ShipmentManagement',
    title: 'menu.shipments',
    key: 'shipments',
    access: 'routeFilter',
  },
  {
    path: '/customers',
    component: './Management/CustomerManagement',
    title: 'menu.customers',
    key: 'customers',
    access: 'routeFilter',
  },
  {
    path: '/products',
    component: './Management/ProductManagement',
    title: 'menu.products',
    key: 'products',
    access: 'routeFilter',
  },
  {
    path: '/analytics',
    component: './Management/AnalyticManagement',
    title: 'menu.analytics',
    key: 'analytics',
    access: 'routeFilter',
    routes: [
      {
        hideInMenu: true,
        path: '/analytics/products/skuprofitability',
        component: './Management/AnalyticManagement',
      },
      {
        hideInMenu: true,
        path: '/analytics/orders/historicalexports',
        component: './Management/AnalyticManagement',
      },
      {
        hideInMenu: true,
        path: '/analytics/purchaseorders/historicalexports',
        component: './Management/AnalyticManagement',
      },
    ],
  },
  {
    path: '/settings',
    component: './Management/Settings',
    title: 'menu.settings',
    key: 'user_administration',
    access: 'routeFilter',
    routes: [
      {
        hideInMenu: true,
        path: '/settings/myprofile',
        component: './Management/Settings/MyProfile',
      },
      {
        hideInMenu: true,
        path: '/settings/warehouses',
        component: './Management/Settings/Warehouses',
      },
      {
        hideInMenu: true,
        path: '/settings/vendors',
        component: './Management/Settings/Vendors',
      },
      {
        hideInMenu: true,
        path: '/settings/potemplates',
        component: './Management/Settings/POTemplates',
      },
      {
        hideInMenu: true,
        path: '/settings/useradministration',
        component: './Management/Settings/UserAdministration',
      },
      {
        hideInMenu: true,
        path: '/settings/companyinfo',
        component: './Management/Settings/CompanyInfo',
      },
    ],
  },
  {
    path: '/help',
    component: './Help',
    title: 'menu.help',
    key: 'skubana_apps',
    routes: [
      {
        hideInMenu: true,
        path: '/help/dashboard/general',
        component: './Help/Dashboard/dashboard',
      },
      {
        hideInMenu: true,
        path: '/help/dashboard/skualerts',
        component: './Help/Dashboard/skualerts',
      },
      {
        hideInMenu: true,
        path: '/help/products/general',
        component: './Help/Products/products',
      },
      {
        hideInMenu: true,
        path: '/help/products/manageproducts',
        component: './Help/Products/manageproducts',
      },
      {
        hideInMenu: true,
        path: '/help/products/createcoreproduct',
        component: './Help/Products/createcoreproduct',
      },
      {
        hideInMenu: true,
        path: '/help/products/createbundlekit',
        component: './Help/Products/createbundlekit',
      },
      {
        hideInMenu: true,
        path: '/help/products/createproductvariations',
        component: './Help/Products/createproductvariations',
      },
      {
        hideInMenu: true,
        path: '/help/products/importproducts',
        component: './Help/Products/importproducts',
      },
      {
        hideInMenu: true,
        path: '/help/products/importvendorproducts',
        component: './Help/Products/importvendorproducts',
      },
      {
        hideInMenu: true,
        path: '/help/products/importskuadjustments',
        component: './Help/Products/importskuadjustments',
      },
      {
        hideInMenu: true,
        path: '/help/products/exportproducts',
        component: './Help/Products/exportproducts',
      },
      {
        hideInMenu: true,
        path: '/help/products/searchproducts',
        component: './Help/Products/searchproducts',
      },
      {
        hideInMenu: true,
        path: '/help/products/importproducts',
        component: './Help/Products/importproducts',
      },
      {
        hideInMenu: true,
        path: '/help/products/customproductfields',
        component: './Help/Products/customproductfields',
      },
      {
        hideInMenu: true,
        path: '/help/customers/search',
        component: './Help/Customers/searchcustomers',
      },
      {
        hideInMenu: true,
        path: '/help/customers/customersmodule',
        component: './Help/Customers/customersmodule',
      },
      {
        hideInMenu: true,
        path: '/help/customers/exportcustomerphonenumbers',
        component: './Help/Customers/exportcustomerphonenumbers',
      },
      {
        hideInMenu: true,
        path: '/help/orders/cancelorders',
        component: './Help/Orders/cancelorders',
      },
      {
        hideInMenu: true,
        path: '/help/orders/general',
        component: './Help/Orders/orders',
      },
      {
        hideInMenu: true,
        path: '/help/analytics/orders/historicalsexports',
        component: './Help/Analytics/Orders/historicalordersexports',
      },
      {
        hideInMenu: true,
        path: '/help/analytics/purchaseorders/historicalexports',
        component: './Help/Analytics/PurchaseOrders/historicalpurchaseordersexports',
      },
      {
        hideInMenu: true,
        path: '/help/settings/myprofile',
        component: './Help/Settings/myprofile',
      },
      {
        hideInMenu: true,
        path: '/help/settings/useradministration',
        component: './Help/Settings/useradministration',
      },
      {
        hideInMenu: true,
        path: '/help/settings/companyinfo',
        component: './Help/Settings/companyinfo',
      },
    ],
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
