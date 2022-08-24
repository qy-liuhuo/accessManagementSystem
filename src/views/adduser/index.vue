<template>
  <div class="app-container">
    <el-form
      class="apply-form first-form"
      :model="formData"
      :rules="rule"
      ref="form"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="初始密码" prop="password">
        <el-input
          v-model="formData.password"
          :maxlength="18"
          placeholder="请输入初始密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="formData.phone"
          :maxlength="11"
          placeholder="请输入手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-radio v-model="formData.role" value="2" label="2" border
          >超级管理员</el-radio
        >
        <el-radio v-model="formData.role" value="1" label="1" border
          >管理员</el-radio
        >
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-bottom: 30px" @click="onSubmit"
      >添加</el-button
    >
  </div>
</template>

<script>
import store from "@/store";
import { Message } from "element-ui";
export default {
  data() {
    return {
      formData: {
        username: "",
        name: "",
        password: "",
        role: "1",
        phone: "",
      },
      rule: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur",
          },
        ],
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            min: 6,
            max: 20,
            message: "密码长度在6-20位之间",
            trigger: "blur",
          },
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        phone: [
          {
            min: 11,
            max: 11,
            message: "手机号格式不正确",
            trigger: "blur",
          },
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$store
        .dispatch("user/addAdmin", this.formData)
        .then(() => {
          Message({
            message: "添加成功",
            type: "success",
            showClose: true,
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

