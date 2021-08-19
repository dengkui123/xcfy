import fetch from "./fetch";

export default {
  //文件上传接口
  fileUpload: (query) => fetch.post('/upload/fileUpload', query, {})
}