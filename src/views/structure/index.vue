<template>
  <div class="edit_dev" style="text-align: center">
    <el-transfer
      id="transfer"
      filterable
      :filter-method="filterMethod"
      :titles="['管理员', '超级管理员']"
      filter-placeholder="请输入搜索的账号"
      v-model="value"
      :data="data"
    >
    </el-transfer>
    <el-button type="success" @click="save">保存更改</el-button>
  </div>
</template>

<script>
import { adminList, saveAdminChange } from "@/api/user";
export default {
  data() {
    return {
      //注意data初值要设置成数组，否则会不显示穿梭框
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
    };
  },
  beforeCreate() {
    new Promise((resolve, reject) => {
      adminList()
        .then((response) => {
          const { data } = response;
          var result = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i]["role"] == 2) {
              this.value.push(data[i]["id"]);
            }
            result.push({
              label: data[i]["username"],
              key: data[i]["id"],
            });
          }
          this.data = result;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  methods: {
    save() {
      let data = { list: this.value };
      new Promise((resolve, reject) => {
        saveAdminChange(data)
          .then((response) => {})
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>
<style scoped>
#transfer {
  margin-top: 50px;
}
.edit_dev >>> .el-transfer-panel {
  width: 300px;
  text-align: left;
}
</style>