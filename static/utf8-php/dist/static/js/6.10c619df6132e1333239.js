webpackJsonp([6],{IsIj:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("uO0Y"),o=s.n(r);for(var a in r)"default"!==a&&function(e){s.d(t,e,function(){return r[e]})}(a);var i=s("LHkY");var l=function(e){s("e1kJ")},n=s("VU/8")(o.a,i.a,!1,l,null,null);t.default=n.exports},LHkY:function(e,t,s){"use strict";var r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"container form02"},[s("el-form",{ref:"form02",staticClass:"demo-form-inline",attrs:{"label-position":e.labelPosition,rules:e.rules,"label-width":e.labelWidth,inline:!1,model:e.form2}},[s("el-form-item",{attrs:{label:"微信平台",prop:"wx_id"}},[s("el-select",{attrs:{placeholder:"微信平台"},model:{value:e.form2.wx_id,callback:function(t){e.$set(e.form2,"wx_id",t)},expression:"form2.wx_id"}},[s("el-option",{attrs:{label:"所有平台",value:"0"}}),e._v(" "),s("el-option",{attrs:{label:"智投顾",value:"1"}}),e._v(" "),s("el-option",{attrs:{label:"慧投顾",value:"2"}})],1)],1),e._v(" "),s("div",{staticClass:"custom-tree-container",attrs:{prop:"rules"}},[s("div",{staticClass:"block"},[s("el-tree",{ref:"tree",attrs:{data:e.treeData,props:e.defaultProps,"node-key":"id","show-checkbox":"","check-on-click-node":!0,"expand-on-click-node":!1},on:{"node-click":e.nodeClick},model:{value:e.form2.rules,callback:function(t){e.$set(e.form2,"rules",t)},expression:"form2.rules"}})],1)]),e._v(" "),s("el-form-item",{attrs:{label:"用户组名",prop:"title"}},[s("el-input",{attrs:{placeholder:"姓名"},model:{value:e.form2.title,callback:function(t){e.$set(e.form2,"title",t)},expression:"form2.title"}})],1),e._v(" "),s("el-form-item",{attrs:{label:" "}},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("form2")}}},[e._v("立即创建")])],1)],1)],1)])},staticRenderFns:[]};t.a=r},e1kJ:function(e,t){},uO0Y:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(s("woOf")),o=a(s("qzrg"));function a(e){return e&&e.__esModule?e:{default:e}}t.default={name:"searchinput",data:function(){return{form2:{wx_id:"",title:"",rules:[]},treeData:[],defaultProps:{children:"children",label:"title"},listLoading:!1,addFormVisible:!1,addLoading:!1,depart_info:[],user_info:[],labelPosition:"right",labelWidth:"80px",rules:{}}},mounted:function(){this.getResult(),this.departList(),this.userList()},methods:{getResult:function(){var e=this,t=this;this.listLoading=!0;var s=(0,r.default)({},{});o.default.msgApi.permissList(s).then(function(s){1e3==s.data.error_code?e.$message({message:"权限不足！请联系管理员",type:"error"}):(console.log(s),t.treeData=s.data,t.listLoading=!1)}).catch(function(t){e.$message({message:"执行失败，请重试",type:"error"}),console.log(t)})},nodeClick:function(e){var t=this,s=this.$refs.tree.getCheckedNodes();this.form2.rules.splice(0,this.form2.rules.length),s.forEach(function(e){t.form2.rules.push(e.id)}),console.log(this.form2.rules)},departList:function(){var e=this;o.default.msgApi.departList().then(function(t){t&&t.data&&(t.data&&200==t.status&&(e.depart_info=t.data))}).catch(function(t){e.$message({message:"执行失败，请重试",type:"error"}),console.log(t)})},userList:function(){var e=this;o.default.msgApi.userList().then(function(t){t&&t.data&&(t.data&&200==t.status&&(e.user_info=t.data))}).catch(function(t){e.$message({message:"执行失败，请重试",type:"error"}),console.log(t)})},submitForm:function(e){var t=this;this.$refs.form02.validate(function(e){if(!e)return console.log("error submit!!"),!1;var s=(0,r.default)({},t.form2);o.default.msgApi.userAdd(s).then(function(e){if(console.log(e),e&&e.data){var s=e.data;if(s&&"ok"==s.msg)return t.$message({message:"执行成功",type:"success"}),t.$router.push({path:"/user_list"}),void(t.dialogEdittVisible=!1)}t.$message({message:"执行失败，请重试",type:"error"})}).catch(function(e){t.$message({message:"执行失败，请重试",type:"error"}),console.log(e)})})}}}}});