import axios from "@/network/axios";

export default function login(data) {
  return axios({
    method: "post",
    url: "/login",
    data,
  });
}
