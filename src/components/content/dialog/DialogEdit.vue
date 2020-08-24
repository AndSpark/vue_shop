<template>
  <el-dialog :title="form.title" :visible.sync="dialogFormVisible" :form="form">
    <el-form :model="form.data" :rules="form.rules" ref="formData">
      <el-form-item
        :label="form.list[index]"
        label-width="80px"
        :prop="key"
        v-for="(key, index) in Object.keys(form.data)"
        :key="index"
      >
        <el-input
          v-model="form.data[key]"
          @input="$emit('input', form)"
          :disabled="index == form.disabled ? true : false"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clearUser">取 消</el-button>
      <el-button type="primary" @click="$emit('sure',$refs.formData)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogEdit",
  model: {
    prop: "form",
  },
  data() {
    return { dialogFormVisible: false };
  },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    clearUser() {
      this.dialogFormVisible = false;
      this.$refs.formData.resetFields();
    },
  },
};
</script>

<style lang='scss' scoped>
</style>