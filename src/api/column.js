import fetch from "./fetch";

export default {
  //获取资讯栏目
  getColumByParentId: (query) => fetch.get('/column/getColumByParentId', query),

}