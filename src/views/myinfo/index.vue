<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="账户">
        <el-input v-model="username" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="name" prop="name" :rules="rules" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          prop="password"
          :rules="rules"
          v-model="password"
        />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="phone" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9528/uploadHeader"
          accept="image/jpeg,image/png"
          :data="imgData"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      imgData: {
        token: getToken(),
      },
      username: "",
      name: "",
      phone: "",
      password: "******",
      imageUrl: "",
      headerPath: "",
    };
  },
  /* computed: {
    ...mapGetters(["username", "name", "phone"]),
  }, */
  created() {
    this.fillInfo();
  },
  methods: {
    fillInfo() {
      this.username = store.getters.username;
      this.name = store.getters.name;
      this.phone = store.getters.phone;
    },
    onSubmit() {
      let newInfo = {
        name: this.name,
        password: this.password,
        phone: this.phone,
        header: this.headerPath,
      };
      this.$store
        .dispatch("user/updateInfo", newInfo)
        .then(() => {
          Message({
            message: "修改成功",
            type: "success",
            showClose: true,
          });
        })
        .catch(() => {
          Message({
            message: "修改失败",
            type: "error",
            showClose: true,
          });
        });
    },
    handleAvatarSuccess(res, file) {
      //实际服务器存储地址
      this.headerPath = res.data.headerPath;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isIMG && isLt2M;
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

