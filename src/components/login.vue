<template>
    <div class="login_wrapper">
        <div class="login">
            <el-form :model="formLogin">
                <el-form-item>
                    <h2 class="title">后台管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input :type="passw" v-model="formLogin.password" placeholder="密码"  show-password >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登陆</el-button>
                    <span v-show="this.errorInfo.isShowError" class='error'>
                        {{this.errorInfo.text}}
                    </span>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<style lang="scss">
$input_width:300px;

.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
        width: 460px;
        height: 296px;
        margin-top: -150px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            text-align: center;
            color: #505458;
        }
        .el-form-item__content {
            width: $input_width;
        }
        .el-button {
            width: $input_width;
        }
        .el-form {
            margin: 30px 80px auto 80px;
            .error {
                display: block;
                text-align: center;
                color: red;
            }
        }
    }
}
.recover{
    position:absolute;
    bottom:0px;
    cursor:pointer;
    color:#E6A23C;
    // display: none;
}
.bei{
    position:absolute;
    bottom:20px;
    cursor:pointer;
    color:#505458;
}
</style>

<script>
import apis from '../apis/apis';
import crypto from 'crypto'
export default {
    name: 'login',
    data() {
        return {
            passw:"password",
            formLogin: {   //表单对象
                loginName: '13011872222',
                password: ''
            },
            checked: true,
            errorInfo: {
                text: '登陆失败,请重试',
                isShowError: false //显示错误提示
            }

        }
    },
    mounted() {
        document.onkeydown = (event) => {
            var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键
                this.login();
            }
        };
        this.getCookie();
        var loginLog = {
            ip: returnCitySN["cip"],
            city: returnCitySN["cname"] + '-' + '进入首页'
        };
        apis.shiroApi.loginLog(loginLog);
    },
    methods: {
        login() {
            //调用后端登陆接口
            const md5 = crypto.createHash('md5')
                  md5.update(this.formLogin.password)
                  let password = md5.digest('hex');
                  this.formLogin.password = password;
                  // console.log(this.formLogin.password)
            apis.shiroApi.loginIn(this.formLogin)
                .then((data) => {
                    console.log('success:', data);
                    var access_token = data.access_token;
                    if (data && data.data) {
                        var json = data.data;
                        console.log(json)
                        if (json.code == 1) {
                            console.log("登录成功！");
                            // var token = 'Bearer ' + json.data.token;
                            var token = json.data[0].token;
                            var uid = json.data[0].uid;
                            var name = json.data[0].name;
                            // localStorage.setItem('Authorization',token);
                            localStorage.setItem('token',token);
                            localStorage.setItem('uid',uid);
                            localStorage.setItem('name',name);

                            // if (this.checked == true) {
                            //     console.log("checked == true");
                            //     //传入账号名，密码，和保存天数3个参数
                            //     this.setCookie(this.formLogin.loginName, this.formLogin.password, 7);
                            // }else {
                            //   console.log("清空Cookie");
                            //   //清空Cookie
                            //   this.clearCookie();
                            // }
                            // this.$common.setSessionStorage('username',this.formLogin.loginName);
                            this.$common.setSessionStorage('username',json.data[0].name);
                            // this.$common.setSessionStorage('lev',json.data.sysRoleVoList);
                            // 存入菜单,渲染菜单
                            // this.$store.dispatch("add_Menus",json.data.sysMenuVoList);
                             //动态设置路由
                            // this.$store.dispatch("add_Routes", json.data.sysMenuVoList);

                            //存储按钮权限
                            this.$store.dispatch("add_Permissions", json.data.rolePermissionVoList);
                            this.$router.replace({ path: "/index" });
                            var loginLog={
                                ip:returnCitySN["cip"],
                                city:returnCitySN["cname"]+'-'+json.data[0].name +'-登陆'
                            };

                            apis.shiroApi.loginLog(loginLog);
                            return;
                        }
                        else if (json.message) {
                            this.errorInfo.text = json.message;
                        }
                    }
                    this.errorInfo.isShowError = true;
                    this.$store.dispatch("loginLog",loginLog);
                })
                .catch((err) => {
                    console.log(err);
                    console.log('error:', err);
                    // this.errorInfo.isShowError = true;
                    // this.errorInfo.text = '系统接口异常';
                });

        },
        //设置cookie
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        //读取cookie
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.formLogin.loginName = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.formLogin.password = arr2[1];
                    }
                }
            }
        },
        //清除cookie
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
        rollBackTables() {
            var text = '数据还原';
            apis.shiroApi.rollBackTables()
                .then(data => {
                    var alertText='';
                    if(data.data.status=='SUCCESS'){
                        text += '成功';
                        alertText=text+',请重新登陆';
                    }
                    else{
                        text += '失败';
                        alertText=text+',请重试';
                    }
                    this.$alert(alertText, '提示', {
                        confirmButtonText: '确定',
                    });
                    log(text);
                })
                .catch(e => {
                    this.$alert('数据还原异常,请重试', '提示', {
                        confirmButtonText: '确定',
                    });
                    text += '失败';
                    log(text);
                });
            console.log(text);

            function log(text){
                 var loginLog = {
                ip: returnCitySN["cip"],
                city: returnCitySN["cname"] + '-' + text
            };

            apis.shiroApi.loginLog(loginLog);
            }

        }
    }
}
</script>
