<template>
  <div class="app-container">
    <el-form class="apply-form first-form" :model="formData" :rules="rule" ref="form">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" clearable @blur="selectUserByName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" :maxlength="11" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="体温" prop="temperature">
        <el-input v-model="formData.temperature" :maxlength="11" placeholder="请测量体温" clearable></el-input>
      </el-form-item>
      <el-form-item label="进出方向" prop="direction">
        <el-radio v-model="formData.direction" label="进" border>进入</el-radio>
        <el-radio v-model="formData.direction" label="出" border>外出</el-radio>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-bottom: 30px" @click="onSubmit">添加</el-button>
  </div>
</template>

<script>
import store from "@/store";
import { Message } from "element-ui";
export default {
  data() {
    return {
      formData: {
        name: "",
        direction: "",
        phone: null,
        temperature: null,
      },
      rule: {
        name: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "change",
          },
        ],
        temperature: {
          required: true,
          message: "请填写体温",
          trigger: "change",
        },
        direction: {
          required: true,
          message: "请选择进出方向",
        },
      },
    };
  },
  created() {},
  methods: {
    selectUserByName() {
      this.$store
        .dispatch("user/selectUserByName", this.formData)
        .then((data) => {
          console.log(data);
          this.formData.phone = data.phone;
        })
        .catch(() => {});
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.listLoading = true;
          this.$store
            .dispatch("user/addRecord", this.formData)
            .then(({ httpCode, msg }) => {
              console.log(httpCode);
              if (httpCode == 200) {
                Message({
                  message: msg,
                  type: "success",
                  showClose: true,
                });
              } else {
                Message({
                  message: msg,
                  type: "warning",
                  showClose: true,
                });
              }
            })
            .catch(() => {});
          this.listLoading = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

