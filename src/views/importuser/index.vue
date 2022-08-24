<template>
  <div>
    <div class="app-container">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-table :data="tableData" border highlight-current-row style="width: 100%; margin-top: 20px">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </div>
    <div style="float: right; bottom: 20px">
      <el-button id="downloadBtn" type="primary" @click="download">下载模板文件</el-button>
      <el-button id="downloadBtn" type="primary" @click="upload">上传用户信息</el-button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    download() {
      window.open("https://accessmanage.qylh.xyz/static/用户导入模板.xlsx");
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 100;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "请勿上传超过100M的文件",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
    upload() {
      this.$store
        .dispatch("user/addPasserby", {
          table: this.tableData,
          header: this.tableHeader,
        })
        .then(() => {
          console.log("123");
          this.$message({
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
#downloadBtn {
  margin-left: 10px;
}
</style>