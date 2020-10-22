<template >
    <div>
      <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="账号id" prop="admin_id">
                    <el-input v-model="form2.admin_id" placeholder="账号id" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="admin_name">
                    <el-input v-model="form2.admin_name" placeholder="账号名称" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="admin_names">
                    <el-input v-model="form2.admin_names" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="生成密码" >
                    <el-row>
                      <el-button type="primary" @click="passWord()">点击</el-button>
                    </el-row>
                </el-form-item>
                <el-form-item label="密码" prop="admin_password">
                    <el-input v-model="form2.admin_password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="选择部门" prop="depart_id">
                  <el-select v-model="depart_info.depart_name"  placeholder="请选择部门"   @change="departGet(depart_info.depart_name)"  >
                      <el-option
                      v-for="item in depart_info"
                      :key="item.id"
                      :lable="item.depart_name"
                      :value="item.depart_name" >
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm('form2')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 查询区----end -->

    </div>
</template>
<style lang="scss">
// 设置输入框的宽度

.form02 {
  .el-form-item__content {
    width: 220px;
    .el-select {
      width: 300px;
    }
  }
}
.el-checkbox-group .el-checkbox {
  margin-left: 0;
  // padding-right: 30px;
}
.el-checkbox{
  width:173px;
}
</style>
<script>
import apis from '../../apis/apis';
export default {
  name: "searchinput",
  data() {
    return {
      personInfo:this.$route.query,
      form2: {
        //表单对象
        admin_name: "",
        admin_password: "",
        admin_names: "",
        depart_id: "",
      },
      depart_info:[],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {

      }
    };
  },
  mounted() {
    this.getParams();
    this.departList();
    this.accountDetail();
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        // console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.admin_id = this.personInfo.admin_id;
        this.form2.admin_name = this.personInfo.admin_name;

    },
    accountDetail(){
        var admin_id  = this.personInfo.admin_id;
        apis.msgApi.accountDetail({admin_id:admin_id})
        .then((data)=>{
          console.log(data);
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  this.form2.admin_names = data.data.admin_names;
                  this.form2.depart_id = data.data.depart_id;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
   // 部门列表
   departList() {
     apis.msgApi.departList()
     .then((data)=>{
       // console.log(data)
         if(data&&data.data){
             var json=data.data;
             if(json&&data.status==200){
               this.depart_info = json;
             }
         }

     })
     .catch((err)=>{
       this.$message({message: '执行失败，请重试',type: "error"});
     console.log(err)
     });
   },
   departGet(val){
     console.log(val)
     this.depart_info.map((s, index) => {
       if (s.depart_name === val) {
         this.id = this.depart_info[index].id;
         console.log(this.id);
         this.form2.depart_id = this.id;
       }
     })
   },
    passWord(){
        apis.msgApi.passWord()
        .then((data)=>{
          // console.log(data)
            if(data&&data.data){
                var json=data;
                 if(json&&json.status == 200){
                    this.$message({message: '执行成功',type: "success"});
                    this.form2.admin_password = data.data;

                    this.dialogEdittVisible = false;
                    return;
                }
            }

        })
        .catch((err)=>{
            this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.accountEdit(param)
            .then((data)=>{
              console.log(data)
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.msg == 'ok'){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/account_list' })
                        this.dialogEdittVisible = false;
                        return;
                    }
                }
               this.$message({message: '执行失败，请重试',type: "error"});
            })
            .catch((err)=>{
                this.$message({message: '执行失败，请重试',type: "error"});
            console.log(err)
            });
        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  }
};
</script>
