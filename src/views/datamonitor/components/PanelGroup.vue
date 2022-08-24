<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="14" :sm="14" :lg="7" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户数
          </div>
          <count-to :start-val="0" :end-val='peopleNum' :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="14" :sm="14" :lg="7" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="enter" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日进入
          </div>
          <count-to :start-val="0" :end-val="enterNum" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="14" :sm="14" :lg="7" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="out" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日外出
          </div>
          <count-to :start-val="0" :end-val="outNum" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
      <el-button type="success" :loading="openLoading" @click="openDoor()">开门</el-button>
      <br />
      <br />
      <br />
      <el-button type="danger" @click="closeDoor()">关门</el-button>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
  },
  data() {
    return {
      peopleNum: 1000,
      enterNum: 100,
      outNum: 110,
      openLoading: false,
    };
  },
  created() {
    this.listLoading = true;
    this.$store
      .dispatch("user/getNum")
      .then((response) => {
        console.log(response);
        this.peopleNum = response.peopleNum;
        this.enterNum = response.enterNum;
        this.outNum = response.outNum;
      })
      .catch((error) => {});
    this.listLoading = false;
  },
  methods: {
    openDoor() {
      this.openLoading = true;
      this.$store
        .dispatch("user/openDoor")
        .then((httpCode) => {
          console.log(httpCode);
          if (httpCode == 200) {
            this.$message({
              message: "开门成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "网络异常开门失败",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: "网络异常开门失败",
            type: "warning",
          });
        });
      this.openLoading = false;
    },
    closeDoor() {
      this.listLoading = true;
      this.$store
        .dispatch("user/closeDoor")
        .then((httpCode) => {
          console.log(httpCode);
          if (httpCode == 200) {
            this.$message({
              message: "关门成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "网络异常关门失败",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: "网络异常关门失败",
            type: "warning",
          });
        });
      this.listLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
