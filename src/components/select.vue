<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">

              <el-form-item label="微信平台" prop="name">
                   <el-select v-model="form2.name" placeholder="微信平台">
                       <el-option label="智投顾" value="zhitougu" ></el-option>
                       <el-option label="慧投顾" value="huitougu"></el-option>
                       <el-option label="云投顾" value="yuntougu"></el-option>
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
import apis from '../apis/apis';
export default {
  name: "searchinput",
  data() {
    return {
      form2: {
        //表单对象
        name: "",
      },
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        name: [{ required: true, message: "请选择所属微信平台", trigger: "change" }],
      }
    };
  },
  mounted(){
    this.onSearch();
      var loginLog = {
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"] + "-增删改查页"
      };

      // getSourceList.sourceApi.getSourceList(getSourceList);
  },
  methods: {
    onSearch(){
          this.listLoading=true;
          apis.msgApi.useradminId()
          .then((data)=>{
            // console.log(data.data);
            localStorage.setItem('admingroup',data.data);
            this.listLoading=false;
          })
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            console.log(param);
            if(param.name == ''||param.name == null){
              var name = param.name;
              localStorage.setItem('name',name);
              this.$router.replace({ path: "/index" });
            }else{
              var name = param.name;
              localStorage.setItem('name',name);
              this.$router.replace({ path: "/index" });
            }

        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  }
};
</script>
