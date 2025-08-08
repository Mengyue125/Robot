//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";

//引入组件
import HomePage from "@/pages/Home.vue";
import NewsPage from "@/pages/News.vue";
import FAQPage from "@/pages/FAQ.vue";
import InstructorPage from "@/pages/Instructor.vue";

//创建一个路由器
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home", // 重定向到 /home
    },
    {
      path: "/home",
      alias: "/",
      component: HomePage,
      name: "Home",
    },
    {
      path: "/news",
      component: NewsPage,
    },
    {
      path: "/faq",
      component: FAQPage,
    },
    {
      path: "/instructor",
      component: InstructorPage,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
    return {
      selector: to.hash,
      offset: { y: 120 },
      behavior: 'smooth'
    }
  }
  return { x: 0, y: 0 }
  },
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0); // 立即滚动到顶部
  next();
});

export default router;
