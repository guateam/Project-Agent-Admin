// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '人员管理',
    icon: 'folder-o',
    children: [
      { path: '/user', title: '从业者管理' },
      { path: '/company', title: '企业账号' },
      { path: '/verified', title: '实名认证' }
    ]
  }
]
