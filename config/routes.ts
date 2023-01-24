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
    name: 'DASHBOARD',
    component: './Dashboard',
  },
  {
    path: '/orders',
    name: 'Orders',
    component: './Management/OrderManagement',
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: './Management/InventoryManagement',
  },
  {
    path: '/purchasing',
    name: 'Purchasing',
    component: './Management/PurchaseOrderManagement',
  },
  {
    path: '/shipments',
    name: 'Shipments',
    component: './Welcome',
  },
  {
    path: '/customers',
    name: 'Customers',
    component: './Management/CustomerManagement',
  },
  {
    path: '/products',
    name: 'Products',
    component: './Management/ProductManagement',
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: './Management/AnalyticManagement',
    routes: [
      {
        hideInMenu: true,
        name: 'Historical Orders Exports / Analytics',
        path: '/analytics/orders/historicalexports',
        component: './Management/AnalyticManagement',
      },
      {
        hideInMenu: true,
        name: 'Historical Purchase Orders Exports / Analytics',
        path: '/analytics/purchaseorders/historicalexports',
        component: './Management/AnalyticManagement',
      },
    ],
  },
  {
    path: '/settings',
    name: 'Settings',
    component: './Management/Settings',
    routes: [
      {
        hideInMenu: true,
        name: 'My Profile / Settings',
        path: '/settings/myprofile',
        component: './Management/Settings/MyProfile',
      },
      {
        hideInMenu: true,
        name: 'Warehouses /Settings',
        path: '/settings/warehouses',
        component: './Management/Settings/Warehouses',
      },
      {
        hideInMenu: true,
        name: 'Vendors / Setting',
        path: '/settings/vendors',
        component: './Management/Settings/Vendors',
      },
      {
        hideInMenu: true,
        name: 'PO Templates / Setting',
        path: '/settings/potemplates',
        component: './Management/Settings/POTemplates',
      },
      {
        hideInMenu: true,
        name: 'User Administration / Setting',
        path: '/settings/useradministration',
        component: './Management/Settings/UserAdministration',
      },
      {
        hideInMenu: true,
        name: 'Company Info / Setting',
        path: '/settings/companyinfo',
        component: './Management/Settings/CompanyInfo',
      },
    ],
  },
  {
    path: '/help',
    name: 'Help',
    component: './Help',
    routes: [
      {
        hideInMenu: true,
        name: 'SKU Alerts / Dashboard - Help',
        path: '/help/dashboard/skualerts',
        component: './Help/Dashboard',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
