import fetch from './fetch';

export default {
  // 文章详情
  getArticleById: (query) => fetch.get('/article/getArticleById', query),

  // 文章列表
  getArticleList: (query) => fetch.get('/article/getArticleList', query),

  // 获取文章关联展会
  getRelatedExhibition: (query) => fetch.get('/article/getRelatedExhibition', query),

  // 增加文章浏览数量
  visitor: (query) => fetch.post('/article/visitor', query),
};
