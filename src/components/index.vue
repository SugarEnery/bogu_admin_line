<template>

</template>
<style>
.hongbao_zanzhu {
  display: block;
  position: fixed;
  text-align: center;
  bottom: 336px;
  width: 230px;
  right: 0;
  font-size: 23px;
  color: #505458;
}
.hongbao {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 330px;
  width: 230px;
}
.zanzhulist{
  border:1px dashed gray;
  display: inline-block;
}
.zanzhutb  tr td:first-child{
  text-align: right;
}
.zanzhutb  tr td:nth-child(2){
  width:80px;
}
</style>
<!-- <script>
// import apis from "../apis/apis";
// export default {
  // data() {
  //   return {
  //     zanzhu:[]
  //   }
  // },
  // methods: {
//     rollBackTables() {
//       var text = "数据还原";
//       // location.reload();
//       // apis.shiroApi
//       //   .rollBackTables()
//       //   .then(data => {
//       //     var alertText = "";
//       //     if (data.data.status == "SUCCESS") {
//       //       text += "成功";
//       //       alertText = text + ",请重新登陆";
//       //     } else {
//       //       text += "失败";
//       //       alertText = text + ",请重试";
//       //     }
//       //     this.$alert(alertText, "提示", {
//       //       confirmButtonText: "确定"
//       //     });
//       //     log(text);
//       //   })
//       //   .catch(e => {
//       //     this.$alert("数据还原异常,请重试", "提示", {
//       //       confirmButtonText: "确定"
//       //     });
//       //     text += "失败";
//       //     log(text);
//       //   });
//       // console.log(text);

//       function log(text) {
//         // var loginLog = {
//         //   ip: returnCitySN["cip"],
//         //   city: returnCitySN["cname"] + "-" + text
//         // };

//         // apis.shiroApi.loginLog(loginLog);
//       }
//     },
//     getDate(param){
//       return this.$common.toDate(param);
//     }
//   },
//   // mounted() {

//   // },
//   // computed:{

//   // }
// };
// </script> -->
