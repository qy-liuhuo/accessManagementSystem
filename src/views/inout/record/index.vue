<template>
  <div class="app-container">
    <!-- 头部工具栏 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">

      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="方向" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.direction}}</span>
        </template>
      </el-table-column>
      <el-table-column label="体温" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.temperature}}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记方法" width="110px">
        <template slot-scope="{row}">
          <span>{{ row.method=='auto'?'自动':'手动'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="时间" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "inoutRecord",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      tableKey: 0,
      //数据
      list: null,
      //数据量
      total: 0,
      //加载标志
      listLoading: true,
      //查询条件
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: "+id",
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        id_code: undefined,
        name: undefined,
        phone: undefined,
        address: undefined,
        isAdd: 1,
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "更改",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        id_code: [
          { required: true, message: "请填写身份证号", trigger: "change" },
        ],
        name: [
          {
            required: true,
            message: "请填写姓名",
            trigger: "change",
          },
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表
    getList() {
      var that = this;
      this.listLoading = true;
      this.$store
        .dispatch("user/recordList", this.listQuery)
        .then((response) => {
          that.list = response.items;
          that.total = response.total;
        })
        .catch((error) => {});
      this.listLoading = false;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success",
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["id", "姓名", "方向", "体温", "登记方法", "时间"];
        const filterVal = [
          "id",
          "name",
          "direction",
          "temperature",
          "methods",
          "time",
        ];
        let query = this.listQuery;
        query.page = 1;
        query.limit = 999999;
        let oldList = this.list;
        this.$store
          .dispatch("user/recordList", query)
          .then((response) => {
            this.list = response.items;
            const data = this.formatJson(filterVal);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: "table-list",
            });
            this.downloadLoading = false;
            this.list = oldList;
          })
          .catch((error) => {});
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>