const routes = [
  {
    path: "/",
    name: "slider",
    title: "侧边栏",
    component: () => import("../components/slider.vue"), //.vue不能省略
    children: [
      {
        path: "/client",
        name: "client",
        title: "员工",
        component: () => import("../components/client.vue"), //.vue不能省略
      },
      {
        path: "/department",
        name: "department",
        title: "部门",
        component: () => import("../components/department.vue"), //.vue不能省略
      },
      {
        path: "/wage",
        name: "wage",
        title: "工资",
        component: () => import("../components/wage.vue"), //.vue不能省略
      },
    ],
  },
];
export default routes;