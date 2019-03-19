/* eslint-disable */
// 工具
import util from '@/libs/util.ice'; // 页面和布局

import Index from './pages/Index';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import User from './pages/user';
import Company from './pages/company';
import Verified from './pages/verified';
import Log from './pages/log';
import Notice from './pages/notice';
import Report from './pages/report';
import Article from './pages/article';
import Answer from './pages/answer';
import Question from './pages/question';
import Expert from './pages/expert';
import UserDetail from './pages/user-detail';
import Lables from './pages/lables';
import Smlable from './pages/smlable';
import Recommend from './pages/recommend';
import Activities from './pages/activities';
import SecondTags from './pages/second_tags';
import Tags from './pages/tags';
import Activity from './pages/activity';
import HeaderAside from './layouts/HeaderAside'; // 变量名 routerConfig 为 iceworks 检测关键字
// ice 会自动在这个变量下添加路由数据
// 请不要修改名称
// 备注 ice 自动添加的路由记录是以下格式
// {
//   path: '/page4',
//   layout: d2LayoutMain,
//   component: 4
// }
// 如果不指定 name 字段，会根据 path 生成 name = page-demo1
// 转换规则见 util.recursiveRouterConfig 中 path2name 方法
// meta 字段会和默认值使用 Object.assign 合并
// 如果不指定 meta.name 的话，name 字段会使用和上面路由 name 一样的取值逻辑
// 下面两个页面就是对比 你可以分别观察两个页面上显示的路由数据差异

const routerConfig = [
  {
    path: '/question',
    layout: HeaderAside,
    component: Question,
    meta: {
      title: '问题审核',
    },
  },
  {
    path: '/notice',
    layout: HeaderAside,
    component: Notice,
    meta: {
      title: '通知发布',
    },
  }, // 首页 必须 name:index
  {
    path: '/',
    name: 'index',
    layout: HeaderAside,
    component: Index,
  },
  {
    path: '/user',
    layout: HeaderAside,
    component: User,
    meta: {
      title: '普通用户管理',
    },
  },
  {
    path: '/company',
    layout: HeaderAside,
    component: Company,
    meta: {
      title: '企业账号',
    },
  },
  {
    path: '/verified',
    layout: HeaderAside,
    component: Verified,
    meta: {
      title: '实名认证',
    },
  }, // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next(vm => vm.$router.replace(from.fullPath));
      },

      render: h => h(),
    },
  }, // 页面重定向 必须保留
  {
    path: '/redirect/:route*',
    name: 'redirect',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next(vm => vm.$router.replace(JSON.parse(from.params.route)));
      },

      render: h => h(),
    },
  },
  {
    path: '/answer',
    layout: HeaderAside,
    component: Answer,
    meta: {
      title: '回答审核',
    },
  }, // 页面重定向 必须保留
  {
    path: '/redirect/:route*',
    name: 'redirect',
    layout: HeaderAside,
    hidden: true,
    component: {
      beforeRouteEnter(to, from, next) {
        next(vm => vm.$router.replace(JSON.parse(from.params.route)));
      },

      render: h => h(),
    },
  },
  {
    path: '/article',
    layout: HeaderAside,
    component: Article,
    meta: {
      title: '文章审核',
    },
  },
  {
    path: '/report',
    layout: HeaderAside,
    component: Report,
    meta: {
      title: '举报审核',
    },
  },
  {
    path: '/log',
    layout: HeaderAside,
    component: Log,
    meta: {
      title: '系统日志',
    },
  },
  {
    path: '/expert',
    layout: HeaderAside,
    component: Expert,
    meta: {
      title: '专家账号',
    },
  },
  {
    path: '/userDetail',
    layout: HeaderAside,
    component: UserDetail,
    meta: {
      title: '用户详情',
    },
  },
  {
    path: '/secondtags',
    layout: HeaderAside,
    component: SecondTags,
    meta: {
      title: '二级标签管理',
    },
  },
  {
    path: '/tags',
    layout: HeaderAside,
    component: Tags,
    meta: {
      title: '标签管理',
    },
  },
  {
    path: '/lables',
    layout: HeaderAside,
    component: Lables,
    meta: {
      title: '大标签',
    },
  },
  {
    path: '/smlable',
    layout: HeaderAside,
    component: Smlable,
    meta: {
      title: '小标签',
    },
  },
  {
    path: '/recommend',
    layout: HeaderAside,
    component: Recommend,
    meta: {
      title: '推荐发布',
    },
  },
  {
    path: '/activities',
    layout: HeaderAside,
    component: Activities,
    meta: {
      title: '活动发布',
    },
  },
  {
    path: '/activity',
    layout: HeaderAside,
    component: Activity,
    meta: {
      title: '活动管理',
    },
  },
]; // 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig

const routerConfigMenuOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  }, // 404
  {
    path: '*',
    component: Error404,
  },
]; // 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default util.recursiveRouterConfig([
  ...routerConfig,
  ...routerConfigMenuOut,
]); // 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = util.recursiveRouterConfig(routerConfig).map(e => {
  const route = e.children ? e.children[0] : e;
  return {
    path: e.path,
    name: route.name,
    hidden: route.hidden,
    meta: route.meta,
  };
});
