<template >
    <div>
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">

                <el-form-item label="权限标题" prop="title">
                    <el-input v-model="form2.title" placeholder="权限标题"></el-input>
                </el-form-item>
                <el-form-item label="权限路径" prop="name">
                    <el-input v-model="form2.name" placeholder="权限路径"></el-input>
                </el-form-item>
                <el-form-item label="父级权限" prop="pid">
                  <el-select v-model="form2.pid"  placeholder="请选择父级权限" >
                      <el-option
                      v-for="item in permis_info"
                      :key="item.id"
                      :lable="item.title"
                      :value="item.id" >
                      {{item.title}}
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
  width:20px;
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
        title: "",
        name: "",
        pid:"",
      },
      permis_info:[],
      //组织结构数据
      treeData: [],
      //属性名称转换
      defaultProps: {
        children: "children",
        label: "title"
      },
      //组织结构树Loading
      listLoading: false,
      //添加组织结构dialog显示状态
      addFormVisible: false,
      //添加按钮Loading加载
      addLoading: false,
      labelPosition: "right", //lable对齐方式
      labelWidth: "80px", //lable宽度
      rules:  {

      }
    };
  },
  mounted() {
    this.permissList();
  },
  methods: {
    // 权限下拉菜单
    permissList() {//初始化下拉框动态数据
        apis.msgApi.permissList()
        .then((data)=>{
          console.log(data)
            if(data&&data.data){
                var json=data.data;
                if(json&&data.status==200){
                  var permis_info = data.data
                  this.permis_info = data.data;
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
            apis.msgApi.permissAdd(param)
            .then((data)=>{
              console.log(data)
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.msg == 'ok'){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/permis_rules' })
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
