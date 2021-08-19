import VueRouter from 'vue-router';
import Index from '@pages/Index/Index';
import ExhibitionChina from '@pages/ExhibitionChina/Index';
import Login from '@pages/Login/Login';
import Error from '@pages/Error/Error';
import ExhibitionAbroad from '@pages/ExhibitionAbroad/Index';
import Exhibition from '@pages/Exhibition/Index';
import ExhibitionDetail from '@pages/Exhibition/Detail/Detail';
import Services from '@pages/Services/Services';
import ServicesDetail from '@pages/Services/Detail/Index';
import ServicesBuy from '@pages/Services/Buy/Index';
import News from '@pages/News/News';
import Contact from '@pages/Contact/Contact';
import About from '@pages/About/About';
import Newsdetail from '@pages/News/Detail/index';
import User from '@pages/User/User';
import Register from '@/pages/User/Register';
import WebTerms from '@pages/User/WebTerms';
import Pay from '@pages/Pay/Index';
import Search from '@pages/Search/Search';

const routers = [
  {
    path: '/',
    component: Index,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/index',
    redirectTo: '/',
    component: Index,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/exhibitionAbroad',
    component: ExhibitionAbroad,
    meta: {
      title: '国际展会',
    },
  },
  {
    path: '/exhibitionChina',
    component: ExhibitionChina,
    meta: {
      title: '国内展会',
    },
  },
  {
    path: '/exhibition',
    component: Exhibition,
    meta: {
      path: ['exhibitionAbroad', 'exhibitionChina'],
      title: '展会列表',
    },
  },
  {
    path: '/exhibition/detail',
    component: ExhibitionDetail,
    meta: {
      title: '展会详情',
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/search',
    component: Search,
    meta: {
      title: '搜索结果',
    },
  },
  {
    path: '/services',
    component: Services,
    meta: {
      title: '展会服务',
    },
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      title: '支付确认页面',
      hasLogin: true,
    },
  },
  {
    path: '/services/detail',
    component: ServicesDetail,
    meta: {
      title: '服务详情',
    },
  },
  {
    path: '/services/buy',
    component: ServicesBuy,
    meta: {
      title: '立即购买',
      hasLogin: true,
    },
  },
  {
    path: '/news',
    component: News,
    meta: {
      title: '展会资讯',
    },
  },
  {
    path: '/news/detail',
    component: Newsdetail,
    meta: {
      title: '资讯详情',
    },
  },
  {
    path: '/contact',
    component: Contact,
    meta: {
      title: '联系我们',
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于我们',
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '个人中心',
      hasLogin: true,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: '注册',
    },
  },
  {
    path: '/webterms',
    component: WebTerms,
    meta: {
      title: '网站条款',
    },
  },
  {
    path: '/error',
    component: Error,
    meta: {
      title: '404',
    },
  },
];

const router = new VueRouter({
  routes: routers,
  mode: 'hash',
  // mode: 'history',
});

const RouterPromise = (to) =>
  new Promise((resolve) => {
    console.log(to);
    document.title = to.meta.title ? `${to.meta.title} | 小草发芽` : '小草发芽';
    // 检查登录校验
    if (to.meta.hasLogin === true && !window.$token) {
      resolve('/login');
      return;
    }
    // 没有登录未找到匹配的页面
    if (!window.$hasLogin && Array.isEmpty(to.matched)) {
      resolve('/');
      return;
    }
    // 未找到匹配的页面
    if (Array.isEmpty(to.matched)) {
      resolve('/error');
      return;
    }
    resolve();
  });

// 路由守卫
router.beforeEach((to, from, next) => {
  RouterPromise(to).then((toRes) => {
    next(toRes);
  });
});

export default router;
