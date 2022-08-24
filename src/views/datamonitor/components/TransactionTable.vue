<template>

  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="姓名" min-width="100">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="进出方向" width="100">
      <template slot-scope="scope">
        {{ scope.row.direction  }}
      </template>
    </el-table-column>
    <el-table-column label="体温" width="100">
      <template slot-scope="scope">
        {{ scope.row.temperature  }}
      </template>
    </el-table-column>
    <el-table-column label="时间" width="400">
      <template slot-scope="{row}">
        {{ row.time }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from "@/api/remote-search";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store
        .dispatch("user/getRiskItems")
        .then((data) => {
          this.list = data.slice(0, 8);
        })
        .catch(() => {});
      /* transactionList().then((response) => {
        this.list = response.data.items.slice(0, 8);
      }); */
    },
  },
};
</script>
