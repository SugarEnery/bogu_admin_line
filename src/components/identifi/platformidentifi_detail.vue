<template >
    <div>
      <!-- 平台鉴定1 -->
        <!-- {{personInfo}} -->
        <!-- 查询区----start -->
        <div class="container form02">
            <el-form :label-position="labelPosition" :rules="rules" ref="form02" :label-width="labelWidth" :inline="false" :model="form2" class="demo-form-inline">
              <el-form-item label="鉴定需求" prop="appraisal_need">
                  <div >
                    {{form2.appraisal_need}}
                  </div>
              </el-form-item>
              <el-form-item label="断代" prop="dating">
                  <el-input v-model="form2.dating" placeholder="断代" ></el-input>
              </el-form-item>


                <div class="box-container">
                    <Ueditor @ready="editorReady"
                      ref="ue"
                      :value="defaultMSG"
                      :ueditorConfig="config"
                      style="width:100%;">
                    </Ueditor>
                </div>
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
    width: 310px;
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
  width:150px;
  // display: inline;
}
.document-editor__editable{
    min-height: 400px;
}
.ck-content{
  min-height: 400px;
}
.el-textarea__inner{
  height:150px;
}
</style>
<script>
import apis from '../../apis/apis';
import Ueditor from '../../components/ckeditor/baidu.vue';
export default {
  name: "searchinput",
  data() {
    return {
      personInfo:this.$route.query,
      form2: {
        //表单对象
        id:"",
        collection_name: "",
        collection_year: "",
        dating:"",
        expert_opinion: "",
        image: "",
        doUpload:'http://api.chinabogu.com/homeApi/upload',
        dialogImageUrl: '',
        dialogVisible: false,
        productImgs: [],
        isMultiple: true,
        imgLimit: 1,
      },
      defaultMSG: null,
      form: {
          content: ''
      },
      config: {
          initialFrameHeight: 500
      },
      orderprice:[],
      auctionType_info:[],//拍卖分类列表
      peoples:[],
      products:[],
      editor:null,//编辑器实例
      EditorObj: "",
      labelPosition: "right", //lable对齐方式
      labelWidth: "100px", //lable宽度
      rules:  {
      }
    };
  },
  computed: {
      headers() {
          return {
              'userToken': localStorage.getItem("token"),
              'uid' : localStorage.getItem("uid"),
              'Access-Control-Allow-Headers':'x-requested-with:content-type'
          }
      }
  },
  mounted() {
    this.getParams();
  },
  components: {
    Ueditor
  },
  methods: {
    getParams() {
        // 取到路由带过来的参数
        const routerParams = this.personInfo
        // this.mallCode = routerParams;
        console.log(routerParams);
        // 将数据放在当前组件的数据内
        this.form2.id = this.personInfo.id;
        this.form2.collection_name = this.personInfo.collection_name;
        this.form2.image = this.personInfo.image;
        this.form2.dating = this.personInfo.dating;
        this.form2.order_price = this.personInfo.order_price;
        this.form2.order_status = this.personInfo.order_status;
        this.form2.appraisal_need = this.personInfo.appraisal_need;

        if(this.personInfo.expert_opinion !=null){
          this.form.content = this.personInfo.expert_opinion;
          this.form2.expert_opinion = this.personInfo.expert_opinion;
        }
        this.form.dating = this.personInfo.dating;
    },
    // 编辑器
    editorReady(instance) {
        instance.setContent(this.form.content);
        instance.addListener('contentChange', () => {
            this.form2.expert_opinion = instance.getContent();
        });
    },
    //表单提交
    submitForm(form2) {
      this.$refs["form02"].validate(valid => {
        if(valid){
            let param = Object.assign({}, this.form2);
            apis.msgApi.platformIdentifi(param)
            .then((data)=>{
              console.log(data);
                if(data&&data.data){
                    var json=data.data;
                     if(json&&json.code == 1){
                        this.$message({message: '执行成功',type: "success"});
                        this.$router.push({ path: '/platformidentifi_list' })
                        this.dialogEdittVisible = false;
                        return;
                    }else{
                      this.$message({message: json.msg,type: "error"});
                    }
                }
               // this.$message({message: '执行失败，请重试',type: "error"});
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
