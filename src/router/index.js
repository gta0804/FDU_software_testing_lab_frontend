import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import login from '@/components/login'
import welcome from '@/components/welcome'
import check from '@/components/check'
import bill from '@/components/bill'



Vue.use(Router);

//解决路由跳转相同地址时报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export const router = new Router({
  //通过路由转到的页面
  routes: [
	{
	  	path: '/',
	  	name: 'login',
	  	component: login
	},
	{
		path: '/login',
		name: 'login',
		component: login
	},
    {
		path: '/welcome',
		name: 'welcome',
		component: welcome,
		meta: {
			//requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
		},
		children: [
			{
				path:'/check',
				name:'check',
				component: check,
				meta: {
					//requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
				}
			},
			{
				path:'/bill',
				name:'bill',
				component: bill,
				meta: {
					//requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
				}
			}
		]
    },
    
  ]
})

// 前端登录拦截
router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
      });
    }
  } else {
    next()
  }
  if (from.fullPath === "/" && to.fullPath === "/login") {
    if (localStorage.getItem('token')) {
      store.commit('logout');
    }
  }
  if (to.fullPath === "/" || to.fullPath === "/login") {
    if (localStorage.getItem('token')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
