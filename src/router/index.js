import Vue from 'vue'
import Router from 'vue-router'
import address from '@/components/address'
import batch from '@/components/batch'
import batchList from '@/components/batchList'
import certification from '@/components/certification'
import dManegement from '@/components/dManegement'
import findBackPsd from '@/components/findBackPsd'
import findBackPsdCo from '@/components/findBackPsdCo'
import goodsDetails from '@/components/goodsDetails'
import help from '@/components/help'
import index from '@/components/index'
import mine from '@/components/mine'
import login from '@/components/login'
import register from '@/components/register'
import myIndent from '@/components/myIndent'
import order from '@/components/order'
import orderDetail from '@/components/orderDetail'
import payment from '@/components/payment'
import paySuccess from '@/components/paySuccess'
import proof from '@/components/proof'
import verify from '@/components/verify'
import refunds from '@/components/refunds'
import safe from '@/components/safe'
import search from '@/components/search'
import shopCart from '@/components/shopCart'
import tManagement from '@/components/tManagement'
import classify from '@/components/classify'
import batchListPay from '@/components/common/batchListPay'
import refundDetail from '@/components/refundDetail'
import paywayWeixin from '@/components/paywayWeixin'

import bestservice from '@/components/help/bestservice'
import contactus from '@/components/help/contactus'
import delivery from '@/components/help/delivery'
import invoice from '@/components/help/invoice'
import origin from '@/components/help/origin'
import platformrules from '@/components/help/platformrules'
import pledge from '@/components/help/pledge'
import problem from '@/components/help/problem'
import quality from '@/components/help/quality'
import registercertify from '@/components/help/registercertify'
import returnprocess from '@/components/help/returnprocess'
import returnterms from '@/components/help/returnterms'
import termsofservice from '@/components/help/termsofservice'
import userrights from '@/components/help/userrights'
import weare from '@/components/help/weare'
import nopage from '@/components/404'

import activity from '@/components/activity'

import store from '@/vuex/store'

import cookieOperate from '@/assets/js/common'

Vue.use(Router)

const routes = [
  	{path: '/', name: 'index', component: index},
    {path: '/address', name: 'address', component: address},
    {path: '/batch', name: 'batch', component: batch},
    {path: '/classify', name: 'classify', component: classify},
    {path: '/activity',name: 'activity', component:activity},
    // {path: '/dManegement', name: 'dManegement', component: dManegement},
    {path: '/findBackPsd', name: 'findBackPsd', component: findBackPsd},
    {path: '/goodsDetails', name: 'goodsDetails', component: goodsDetails},
    {path: '/help', name: 'help', component: help,children:[
        {path:'/help/bestservice',component:bestservice},
        {path:'/help/contactus',component:contactus},
        {path:'/help/delivery',component:delivery},
        {path:'/help/invoice',component:invoice},
        {path:'/help/origin',component:origin},
        {path:'/help/platformrules',component:platformrules},
        {path:'/help/pledge',component:pledge},
        {path:'/help/problem',component:problem},
        {path:'/help/quality',component:quality},
        {path:'/help/registercertify',component:registercertify},
        {path:'/help/returnprocess',component:returnprocess},
        {path:'/help/returnterms',component:returnterms},
        {path:'/help/termsofservice',component:termsofservice},
        {path:'/help/userrights',component:userrights},
        {path:'/help/weare',component:weare},
    ]},
    // {path: '/mine', name: '', component: mine},
    {path: '/mine/myIndent', name: 'mine', component: mine,children:[
    	{path:'/mine/myIndent',component:myIndent,
            meta: {
                requireAuth: true
            }
        },
    	{path:'/mine/batch',component:batch,
            meta: {
                requireAuth: true
            }
        },
    	{path:'/mine/batchList',component:batchList,
            meta: {
                requireAuth: true
            }
        },
    	{path:'/mine/certification',component:certification,
            meta: {
                requireAuth: true
            }
        },
    	{path:'/mine/address',component:address,
            meta: {
                requireAuth: true
            }
        },
        {path:'/mine/safe',component:safe,
            meta: {
                requireAuth: true
            }
        },
        {path:'/mine/safe/findBackPsdCo',component:findBackPsdCo,
            meta: {
                requireAuth: true
            }
        },
        {path:'/mine/refunds',component:refunds,
            meta: {
                requireAuth: true
            }
        },
        {path:'/mine/batchListPay',component:batchListPay,
            meta: {
                requireAuth: true
            }
        },
        {path:'/mine/orderDetail',component:orderDetail,
            meta: {
                requireAuth: true
            }
        },
        {path:'/mine/refundDetail',component:refundDetail,
            meta: {
                requireAuth: true
            }
        },
    ]},
    {path: '/login', name: 'login', component: login},
    {path: '/register', name: 'register', component: register},
    {path: '/order', name: 'order', component: order,
        meta: {
            requireAuth: true
        }
    },
    {path: '/orderDetail', name: 'orderDetail', component: orderDetail,
        meta: {
            requireAuth: true
        }
    },
    {path: '/payment', name: 'payment', component: payment,
        meta: {
            requireAuth: true
        }
    },
    {path: '/paySuccess', name: 'paySuccess', component: paySuccess,
        meta: {
            requireAuth: true
        }
    },
    {path: '/proof', name: 'proof', component: proof},
    {path: '/verify', name: 'verify', component: verify,
        meta: {
            requireAuth: true
        }
    },
    {path: '/search', name: 'search', component: search},
    {path: '/shopCart', name: 'shopCart', component: shopCart,
        meta: {
            requireAuth: true
        }
    },
    {path: '/tManagement', name: 'tManagement', component: tManagement,
        meta: {
            requireAuth: true
        }
    },
    {path: '/paywayWeixin', name: 'paywayWeixin', component: paywayWeixin,
        meta: {
            requireAuth: true
        }
    },
    {path: '*', name: 'nopage', component: nopage}
  ]


const router = new Router({
    routes
});


let indexs = 0;

router.beforeEach((to, from, next) => {


    // 第一次打开页面(复制链接打开，页面刷新) 检查是否为登录状态
    if(indexs == 0){
        $.ajax({
            url: store.state.apilink+"?s=api/User/is_login",
            dataType: "json",
            async:false,
            type: 'get',
            success: function (res) {
                if(res.code == 2){
                    cookieOperate.setCookie('a34ea2d96d4239d4d86803bb3cd99788',res.user_id,'d1');
                    cookieOperate.setCookie('b61a9d162ac1dfaa22d0f05bdc7f6299',res.is_verify,'d1');
                    cookieOperate.setCookie('8e3c824e1d6254b74a013799c1565538',res.mobile,'d1');
                }else{
                    cookieOperate.delCookie('a34ea2d96d4239d4d86803bb3cd99788');
                    cookieOperate.delCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');
                    cookieOperate.delCookie('8e3c824e1d6254b74a013799c1565538');
                    cookieOperate.delCookie('PHPSESSID');
                }
            }
        });
    }
    
    indexs ++;

    // 获取用户id 认证状态
    let userId = cookieOperate.getCookie('a34ea2d96d4239d4d86803bb3cd99788');
    let proof  = cookieOperate.getCookie('b61a9d162ac1dfaa22d0f05bdc7f6299');


    // 1.认证页面 访问权限 放在各自页面中
    // 2.认证权限 放在各自页面中 心好累

    if (to.matched.some(r => r.meta.requireAuth)) {

        if (userId) {
            next();
        }else {
            next({
                path: '/login'
            })
        }

    }else {
        next();
    }

})

export default router;