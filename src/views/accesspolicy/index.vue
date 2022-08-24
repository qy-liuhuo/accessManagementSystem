<template>
  <div class="app-container">
    <el-form class="apply-form first-form" :model="policy" :rules="rule" ref="form">
      <el-form-item label="允许进入" prop="">
        <el-switch v-model="policy.enter" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="允许外出" prop="">
        <el-switch v-model="policy.out" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="所在地区" prop="">
        <el-select v-model="policy.region" placeholder="选择">
          <el-option v-for="item in options" :key="item.region" :label="item.region" :value="item.region" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-bottom: 30px" @click="onSubmit">更新</el-button>
  </div>
</template>
<script>
import store from "@/store";
import { Message } from "element-ui";
export default {
  data() {
    return {
      policy: {
        enter: true,
        out: true,
        openid: "河北",
      },
      options: undefined,
      rule: {
        name: { required: true, message: "请输入姓名", trigger: "blur" },
      },
    };
  },
  created() {
    //获取地区列表
    this.$store
      .dispatch("user/getRegionList")
      .then((data) => {
        this.options = data;
      })
      .catch(() => {});
    //获取现在的通行政策
    this.$store
      .dispatch("user/getPolicy")
      .then((data) => {
        data.enter = data.enter == "1" ? true : false;
        data.out = data.out == "1" ? true : false;
        this.policy = data;
      })
      .catch(() => {});
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("user/updatePolicy", this.policy)
        .then(() => {
          Message({
            message: "修改成功",
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

