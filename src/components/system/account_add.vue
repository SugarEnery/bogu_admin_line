<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
                <el-form-item label="登录账号" prop="admin_name">
                    <el-input v-model="form2.admin_name" placeholder="登录账号"></el-input>
                </el-form-item>
                <el-form-item label="生成密码" >
                    <el-row>
                      <el-button type="primary" @click="passWord()">点击</el-button>
                    </el-row>
                </el-form-item>
                <el-form-item label="登录密码" prop="admin_password" >
                    <el-input v-model="form2.admin_password" placeholder="登录密码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="admin_names">
                    <el-input v-model="form2.admin_names" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="所属父类" prop="admin_fid">
                  <el-select v-model="director_info.admin_name"  placeholder="请选择总监账号"   @change="directorGet(director_info.admin_name)"  >
                      <el-option
                      v-for="item in director_info"
                      :key="item.admin_id"
                      :lable="item.admin_name"
                      :value="item.admin_name" >
                      </el-option>
                  </el-select>
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
                <el-form-item label="选择分组" prop="group_id">
                  <el-select v-model="user_info.title"  placeholder="请选择分组"   @change="userGet(user_info.title)"  >
                      <el-option
                      v-for="item in user_info"
                      :key="item.id"
                      :lable="item.title"
                      :value="item.title" >
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
      form2: {
        //表单对象
        admin_name: "",
        admin_password: "",
        admin_names: "",
        depart_id: "",
        group_id: "",
        admin_fid: "",
      },
      depart_info:[],//部门
      user_info:[],
      director_info:[],
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {
        admin_name: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        admin_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 12, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        admin_names: [{ required: true, message: "请填写姓名", trigger: "change" }],
        group_id: [{ required: true, message: "请选择所属分组", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.departList();
    this.userList();
    this.directorList();
  },
  methods: {
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
    // 总监账号列表
    directorList() {//初始化下拉框动态数据
        apis.msgApi.directorList()
        .then((data)=>{
          // console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  this.director_info = data.data;
                }
            }
        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    directorGet(val){
      console.log(val)
      this.director_info.map((s, index) => {
        if (s.admin_name === val) {
          this.admin_id = this.director_info[index].admin_id;
          console.log(this.admin_id);
          this.form2.admin_fid = this.admin_id
        }
      })

     },
    // 分组下拉菜单
    userList() {//初始化下拉框动态数据
        apis.msgApi.userList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  this.user_info = data.data;
                }
            }

        })
        .catch((err)=>{
          this.$message({message: '执行失败，请重试',type: "error"});
        console.log(err)
        });
    },
    userGet(val){
      console.log(val)
      this.user_info.map((s, index) => {
        if (s.title === val) {
          this.id = this.user_info[index].id;
          console.log(this.id);
          this.form2.group_id = this.id;
        }
      })
    },
    passWord(){
        apis.msgApi.passWord()
        .then((data)=>{
          console.log(data)
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
            apis.msgApi.accountAdd(param)
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
