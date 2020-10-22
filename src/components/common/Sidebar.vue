<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" >
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                name:localStorage.getItem("name"),
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'index',
                        title: '首页',
                    },
                    {
                        icon: 'el-icon-error',
                        index: 'clients',
                        title: '客户系统',
                        type: 'false',
                        subs: [
                            {
                                index: 'clients_list',
                                title: '客户列表'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'auction',
                        title: '拍卖管理',
                        subs: [
                            {
                                index: 'auction_list',
                                title: '拍卖列表'
                            },
                            {
                                index: 'auction_add',
                                title: '拍卖添加'
                            },
                            {
                                index: 'order_list',
                                title: '拍卖订单列表'
                            },

                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'identifi',
                        title: '鉴定管理',
                        subs: [
                            {
                                index: 'platformidentifi_list',
                                title: '平台鉴定列表'
                            },
                            {
                                index: 'expertsidentifi_list',
                                title: '专家鉴定列表'
                            },


                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'experts',
                        title: '专家管理',
                        subs: [
                            {
                                index: 'experts_list',
                                title: '专家列表'
                            },
                            {
                                index: 'experts_add',
                                title: '专家添加'
                            },


                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'infor',
                        title: '资讯管理',
                        subs: [
                            {
                                index: 'infor_list',
                                title: '资讯列表'
                            },
                            {
                                index: 'infor_add',
                                title: '资讯添加'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: 'advert',
                        title: '广告管理',
                        subs: [
                            {
                                index: 'advert_list',
                                title: '广告列表'
                            },
                            {
                                index: 'advert_add',
                                title: '广告添加'
                            },


                        ]
                    },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'system',
                    //     title: '系统管理',
                    //     subs: [
                    //         {
                    //             index: 'user_list',
                    //             title: '用户组列表',
                    //         },
                    //         {
                    //             index: 'user_add',
                    //             title: '用户组添加',
                    //         },
                    //         {
                    //             index: 'depart_list',
                    //             title: '部门列表',
                    //         },
                    //         {
                    //             index: 'depart_add',
                    //             title: '部门添加',
                    //         },
                    //         {
                    //             index: 'account_add',
                    //             title: '账号添加',
                    //         },
                    //         {
                    //             index: 'account_list',
                    //             title: '账号列表',
                    //         },
                    //         {
                    //             index: 'director_list',
                    //             title: '总监账号列表',
                    //         },
                    //         {
                    //             index: 'permis_list',
                    //             title: '所有权限列表',
                    //         },
                    //         {
                    //             index: 'permis_rules',
                    //             title: '权限规则添加',
                    //         },

                    //     ],
                    //     status: '1'
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'select',
                    //     title: '选择平台',
                    // },
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'resources',
                    //     title: '侧边栏',
                    //     subs: [

                    //         {
                    //             index: 'sysAcl',
                    //             title: '角色资源授权'
                    //         },
                    //         {
                    //             index: 'sysResource',
                    //             title: '资源管理'
                    //         },
                    //         {
                    //             index: 'sysMenu',
                    //             title: '菜单管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'ckeditor',
                    //     title: '编辑器',
                    // },
                    // {
                    //     icon: 'el-icon-message',
                    //     index: 'baidu',
                    //     title: '百度编辑器',
                    // },

                ]
            }
        },
        computed:mapGetters({
            menuList:'getMenuList',
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }),
        mounted(){
            // var admingroup = localStorage.getItem('admingroup');
            // console.log(admingroup);
            // if(admingroup != 48){
            //    this.items.forEach((ele,index)=>{
            //      if(ele.status == '1'){
            //        console.log(index);
            //        this.items.splice(index, 2);
            //      }
            //    })
            // }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 200px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
