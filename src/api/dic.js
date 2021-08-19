import fetch from './fetch';

export default {
    // 查询时段
    analysisRange: query => fetch.post('/dic/analysis_range', query),
    // 基准
    benchMark: query => fetch.post('/dic/benchMark', query),
    // 金额单位
    figures: query => fetch.post('/dic/figures', query)
};
