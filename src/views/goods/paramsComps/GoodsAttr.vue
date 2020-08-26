<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      :disabled="isDisabled"
      @click="$refs.dialogAddAttr.dialogFormVisible = true"
    >{{btn}}</el-button>
    <el-table :data="attr" size="mini">
      <el-table-column type="expand">
        <template #default="{row}">
          <el-tag
            v-for="(item, index) in row.attr_vals"
            :key="index"
            closable
            size="small"
            @close="editOneAttr(row, index)"
          >{{item}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="cur_vals"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(row)"
            @blur="handleInputConfirm(row)"
          ></el-input>
          <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ New Tag</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column :label="attrName" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditAttr(row)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delAttr(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-edit v-model="formAdd" ref="dialogAddAttr" @sure="addAttr"></dialog-edit>
    <dialog-edit v-model="formEdit" ref="dialogEditAttr" @sure="EditAttr"></dialog-edit>
  </div>
</template>

<script>
import { addAttr_, editAttr_, delelteAttr_ } from "@/network/goods";

import DialogEdit from "@/components/content/dialog/DialogEdit";

import { sureDiglog, deleteDiglog } from "@/common/mixin";
export default {
  name: "GoodsAttr",
  model: {
    prop: "attr",
    event: "up",
  },
  data() {
    return {
      isGo: false,
      valsArr: [],
      attr_vals: "",
      cur_vals: "",
      inputVisible: false,
      formAdd: {
        title: "",
        list: [],
        rules: {
          attr_name: [
            { required: true, message: "请输属性名称", trigger: "blur" },
          ],
        },
        data: {
          attr_name: "",
        },
      },
      formEdit: {
        title: "",
        list: [],
        rules: {
          attr_name: [
            { required: true, message: "请输属性名称", trigger: "blur" },
          ],
        },
        data: {
          attr_name: "",
        },
        attr_id: 0,
      },
    };
  },
  components: {
    DialogEdit,
  },
  mixins: [sureDiglog, deleteDiglog],
  props: {
    type: {
      type: String,
      default: "",
    },
    attr: {
      type: Array,
      default() {
        return [];
      },
    },
    cat_id: {
      type: Number,
    },
  },
  computed: {
    btn() {
      if (this.type == "only") return "添加属性";
      if (this.type == "many") return "添加参数";
    },
    attrName() {
      if (this.type == "only") return "属性名称";
      if (this.type == "many") return "参数名称";
    },
    isDisabled() {
      if (this.attr.length !== 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    type: {
      handler(n) {
        if (n == "only") {
          this.formAdd.title = "添加静态属性";
          this.formAdd.list = ["静态属性"];
          this.formEdit.title = "修改静态属性";
          this.formEdit.list = ["静态属性"];
        }
        if (n == "many") {
          this.formAdd.title = "添加动态属性";
          this.formAdd.list = ["动态属性"];
          this.formEdit.title = "修改动态属性";
          this.formEdit.list = ["动态属性"];
        }
      },
      immediate: true,
    },
  },
  methods: {
    addAttr(formData) {
      this.sureDate(
        formData,
        addAttr_,
        {
          id: this.cat_id,
          attr_name: this.formAdd.data.attr_name,
          attr_sel: this.type,
        },
        0,
        "dialogAddAttr",
        201
      );
      this.formAdd.data.attr_name = "";
      this.$emit("refresh");
    },
    showEditAttr(row) {
      this.formEdit.attr_id = row.attr_id;
      this.formEdit.data.attr_name = row.attr_name;
      this.$refs.dialogEditAttr.dialogFormVisible = true;
    },
    EditAttr(formData) {
      this.sureDate(
        formData,
        editAttr_,
        {
          cat_id: this.cat_id,
          attr_id: this.formEdit.attr_id,
          attr_name: this.formEdit.data.attr_name,
          attr_sel: this.type,
        },
        0,
        "dialogEditAttr"
      );
      this.formEdit.data.attr_name = "";
      this.$emit("refresh");
    },
    delAttr(row) {
      this.showDeleteDiglog(
        { cat_id: this.cat_id, attr_id: row.attr_id },
        delelteAttr_,
        0
      ).then((r) => {
        this.$emit("refresh");
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async handleInputConfirm(row) {
      if (this.isGo == true) {
        this.isGo = false;
        return;
      }
      this.attr_vals = row.attr_vals.join(",") + "," + this.cur_vals;

      let res = await editAttr_({
        cat_id: this.cat_id,
        attr_id: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.type,
        attr_vals: this.attr_vals,
      });
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);

      this.attr
        .find((v) => v.attr_id == row.attr_id)
        .attr_vals.push(this.cur_vals);
      this.inputVisible = false;
      this.inputValue = "";
      this.$emit("up", this.attr);
      this.isGo = true;
    },
    async editOneAttr(row, index) {
      row.attr_vals.splice(index, 1);
      console.log(row.attr_vals);
      let res = await editAttr_({
        cat_id: this.cat_id,
        attr_id: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: this.type,
        attr_vals: row.attr_vals.join(","),
      });
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$emit("up", this.attr);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-tag {
  margin: 0 5px;
}
.button-new-tag {
  margin-left: 5px;
  height: 24px;
  line-height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 80px;
  margin-left: 5px;
}
</style>