/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    // {
    // path: '/',
    // component: () => import('@/views/layouts/index'),
    // redirect: '/home',
    // meta: {
    //   title: '首页',
    //   keepAlive: false
    // },
    // children: [
    {
        path: '/',
        name: 'Home',
        component: () =>
            import ('@/views/home/home.vue'),
        meta: { title: '首页', keepAlive: false }
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
    },
    {
        path: '/award',
        name: 'award',
        component: () =>
            import ('@/views/home/award'),
        meta: { title: '今日排名奖', keepAlive: false }
    },
    {
        path: '/earnings',
        name: 'earnings',
        component: () =>
            import ('@/views/home/earnings'),
        meta: { title: '动态收益', keepAlive: false }
    },
    {
        path: '/airdrop',
        name: 'airdrop',
        component: () =>
            import ('@/views/home/ReceiveAirdrop'),
        meta: { title: 'airdrop', keepAlive: false }
    }
]