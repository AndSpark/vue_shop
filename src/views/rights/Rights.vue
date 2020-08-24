<template>
  <div>
    <dialog-edit ref="dialog" v-model="oform" @sure="$refs.dialog.dialogFormVisible = false"></dialog-edit>
    <button @click="$refs.dialog.dialogFormVisible = true">shosho</button>
  </div>
</template>

<script>
import DialogEdit from "@/components/content/dialog/DialogEdit";

export default {
  name: "Rights",
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };

    var checkPhone = (rule, value, callback) => {
      var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return callback();
      }

      callback(new Error("请输入正确的手机号"));
    };
    return {
      ishow: false,
      oform: {
        title: "添加用户",
        list: ["用户名称", "用户密码", "邮箱", "手机号"],
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            {
              min: 3,
              max: 10,
              message: "长度在 3 到 10 个字符",
              trigger: "blur",
            },
          ],
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur",
            },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur",
            },
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            {
              validator: checkEmail,
              trigger: "blur",
            },
          ],
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
              validator: checkPhone,
              trigger: "blur",
            },
          ],
        },
        data: {
          username: "",
          password: "",
          email: "",
          mobile: "",
        },
      },
    };
  },
  components: {
    DialogEdit,
  },
};
</script>

<style lang='scss' scoped>
</style>