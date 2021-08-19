Object.isTypeOf = (object, type) => typeof object === `${type}`;
Object.isUndefined = object => typeof object === "undefined";
Object.isNull = object => object === null;
Object.isBoolean = object => typeof object === "boolean";
Object.isNumber = object => typeof object === "number";
Object.isString = object => typeof object === "string";
Object.isFunction = object => typeof object === "function";
Object.isObject = object =>
  typeof object === "object" && !Object.isEmpty(object);
Object.isNotNullObject = object =>
  typeof object === "object" && !Object.isEmpty(object);
Object.isArray = object => Array.isArray(object);
Object.isEmpty = object => {
  const obj = object || {};
  const arr = Object.keys(obj);
  return Array.isEmpty(arr);
};
Object.methods = object => {
  const methods = [];
  Object.keys(object).forEach(key => {
    if (
      object[key] &&
      object[key].constructor &&
      object[key].call &&
      object[key].apply
    ) {
      methods.push(key);
    }
  });
  return methods;
};
Date.prototype.format = function(fmt) {
  let newFmt = fmt;
  const o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/([y|Y]+)/.test(newFmt)) {
    newFmt = newFmt.replace(
      RegExp.$1,
      String(this.getFullYear()).substr(4 - RegExp.$1.length)
    );
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(newFmt)) {
      newFmt = newFmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(String(o[k]).length)
      );
    }
  });
  return newFmt;
};
Date.isDate = date => date instanceof Date && !Number.isNaN(date.valueOf());
Date.format = (date, fmt) => {
  const newFmt = fmt || "yyyy-MM-dd hh:mm:ss";
  if (Date.isDate(date)) {
    return date.format(newFmt);
  }
  if (Number.isNaN(parseInt(date, 10))) {
    return "--";
  }
  return new Date(date).format(newFmt);
};
Date.formatDateSecond = (jsondate, fmt) => {
  let newJsonDate = jsondate;
  if (Number.isNaN(parseInt(newJsonDate, 10))) {
    return "--";
  }
  newJsonDate *= 1000;
  return Date.format(newJsonDate, fmt);
};
Date.getHour = (nowDate, toDate) => {
  if (Number.isNaN(parseInt(toDate, 10))) {
    return 0;
  }
  return parseInt((nowDate.getTime() - toDate) / (1000 * 60 * 60));
};
Date.nowString = radix => {
  let radixs = parseInt(radix, 10);
  if (Number.isNaN(radixs)) {
    radixs = 36;
  }
  return Date.now()
    .getTime()
    .toString(radixs);
};
Date.randomString = radix => {
  let newRadix = parseInt(radix, 10);
  if (Number.isNaN(newRadix)) {
    newRadix = 36;
  }
  return Date.now()
    .toString(newRadix)
    .concat(Math.random().toString(newRadix));
};
Date.isSameDay = (date, compDate) => {
  if (!Date.isDate(date) || !Date.isDate(compDate)) {
    return false;
  }
  return (
    date.getFullYear() === compDate.getFullYear() &&
    date.getMonth() === compDate.getMonth() &&
    date.getDate() === compDate.getDate()
  );
};
Date.isSameMonth = (date, compDate) => {
  if (!Date.isDate(date) || !Date.isDate(compDate)) {
    return false;
  }
  return (
    date.getFullYear() === compDate.getFullYear() &&
    date.getMonth() === compDate.getMonth()
  );
};
Date.inRangeDate = (date, startDate, endDate) => {
  if (!Date.isDate(date) || !Date.isDate(startDate) || !Date.isDate(endDate)) {
    return false;
  }
  return (
    date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()
  );
};
Date.diffDay = (startTime, endTime) => {
  if (!Date.isDate(startTime) || !Date.isDate(endTime)) {
    return -1;
  }
  const newStartDate = new Date(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate()
  );
  const newEndDate = new Date(
    endTime.getFullYear(),
    endTime.getMonth(),
    endTime.getDate()
  );
  return Math.floor(
    Math.abs(newEndDate.getTime() - newStartDate.getTime()) / 86400000
  );
};
// 扩充函数
if (!Date.now) {
  Date.now = () => new Date().getTime();
}
Number.integer = {
  min: -2147483648,
  max: 2147483647
};
/**
 * 随机数字
 * @param min
 * @param max
 * @returns {*}
 */
Number.randomInt = (min = 0, max = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
/**
 * 数字检查
 *
 * @param value
 * @param min
 *            option
 * @param max
 *            option
 */
Number.check = (value, min, max) => {
  let ret = false;
  const newValue = parseFloat(value);
  if (Number.isNaN(newValue) || newValue !== value) {
    return ret;
  }
  ret = true;
  const newMin = parseFloat(min);
  const newMax = parseFloat(max);
  if (!Number.isNaN(newMin)) {
    if (newMin.toString() !== min.toString()) {
      return false;
    }
    ret = newValue >= newMin;
    if (!ret) {
      return false;
    }
  }
  if (!Number.isNaN(newMax)) {
    if (newMax.toString() !== max.toString()) {
      return false;
    }
    ret = newValue <= newMax;
  }
  return ret;
};
Number.isNumeric = value =>
  !Number.isNaN(parseFloat(value)) && !Number.isNaN(value - parseFloat(value));
Number.parseIntWithDefault = (value, vdefault) => {
  let newDdefault = parseInt(vdefault, 10);
  if (Number.isNaN(newDdefault)) {
    newDdefault = 0;
  }
  let newValue = parseInt(value, 10);
  if (Number.isNaN(newValue)) {
    newValue = newDdefault;
  }
  return newValue;
};
Number.parseIntRate = (value, rate) => {
  if (!Number.isNumeric(value)) {
    return 0;
  }
  if (!Number.isNumeric(rate)) {
    return parseInt(rate, 10);
  }
  return parseInt((value * rate).toPrecision(12), 10);
};
Number.parseIntRatio = (value, ratio) => {
  const newRatio = Number.parseIntWithDefault(ratio, 0);
  if (newRatio === 0) {
    throw new Error("ratio can't be zero!!");
  }
  return parseInt((value / newRatio).toPrecision(12), 10);
};
Number.parseFloatWithDefault = (value, vdefault, toFixed) => {
  let newDefault = parseFloat(vdefault);
  if (Number.isNaN(newDefault)) {
    newDefault = 0;
  }
  let newToFixed = parseInt(toFixed, 10);
  if (Number.isNaN(toFixed)) {
    newToFixed = -1;
  }
  let newValue = parseFloat(value);
  if (Number.isNaN(newValue)) {
    newValue = newDefault;
  }
  newValue = parseFloat(newValue.toPrecision(12));
  if (newToFixed > -1) {
    return parseFloat(newValue.toFixed(newToFixed));
  }
  return value;
};
Number.pad = (number, len) => (Array(len).join(0) + number).slice(-len);
Number.formatPenny = value => {
  let newValue = parseFloat(value);
  if (Number.isNaN(newValue)) {
    newValue = 0;
  }
  if (newValue % 100 === 0) {
    return Number(newValue / 100);
  }
  return Number(Number((value / 100).toPrecision(12)).toFixed(2));
};
Number.formatRate = (value, rate, toFixed) => {
  const newValue = parseFloat(value);
  let newRate = parseInt(rate, 10);
  const newToFixed = parseInt(toFixed, 10);
  if (Number.isNaN(newToFixed)) {
    return "--";
  }
  if (Number.isNaN(value)) {
    return "--";
  }
  if (Number.isNaN(newRate)) {
    newRate = 1;
  }
  if (value % rate === 0) {
    return Number(newValue / newRate);
  }
  return Number(Number((newValue / rate).toPrecision(12)).toFixed(toFixed));
};
String.prototype.replaceAll = function(target, replacement) {
  if (String.isEmpty(this)) {
    return this;
  }
  return this.split(target).join(replacement);
};
String.isEmpty = value => !value || value.toString().trim().length === 0;
String.replaceAll = (s, target, replacement) => {
  if (String.isEmpty(s)) {
    return s;
  }
  return s.split(target).join(replacement);
};
String.trim = s => {
  if (String.isEmpty(s)) {
    return s;
  }
  return s.replace(/(^\s*)|(\s*$)/g, "");
};
String.ltrim = s => {
  if (String.isEmpty(s)) {
    return s;
  }
  return s.replace(/(^\s*)/g, "");
};
String.rtrim = s => {
  if (String.isEmpty(s)) {
    return s;
  }
  return s.replace(/(\s*$)/g, "");
};
String.startsWith = (s, searchString, position) => {
  if (String.isEmpty(s)) {
    return false;
  }
  const newPosition = Number.parseInt(position, 10);
  if (newPosition) {
    return false;
  }
  return s.indexOf(searchString, newPosition) === newPosition;
};
String.endWith = s => {
  if (String.isEmpty(s)) {
    return false;
  }
  if (s.length > this.length) {
    return false;
  }
  return this.substring(this.length - s.length) === s;
};
String.isMobile = mobile => {
  const reg = /^1[0-9]{10}$/;
  return reg.test(mobile);
};
String.isEmail = email => {
  const reg = new RegExp(
    '(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})',
    "i"
  );
  return reg.test(email);
};
String.isUrl = url => {
  const reg = new RegExp(
    "https?://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
  );
  return reg.test(url);
};
String.trim = () => this.replace(/^\s+|\s+$/g, "");
if (!Array.isArray) {
  Array.isArray = arg =>
    "[object Array]" === Object.prototype.toString.call(arg);
}
Array.isEmpty = array => !array || !Array.isArray(array) || array.length === 0;
Array.deleteElement = (array, callback) => {
  if (!Array.isArray(array) || array.length === 0) {
    return array;
  }
  if (!Object.isTypeOf(callback, "function")) {
    throw new Error("callback can not be null");
  }
  const newArray = [];
  array.forEach((item, index) => {
    if (callback(item, index)) {
      return;
    }
    newArray.push(item);
  });
  return newArray;
};
Array.random = (array, count) => {
  if (Array.isEmpty(array) || !Number.check(count, 1)) {
    return [];
  }
  const shuffled = array.slice(0);
  let i = array.length;
  let min = i - count;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};
Array.containsAny = (array1, array2, callback) => {
  if (Array.isEmpty(array1) || Array.isEmpty(array2)) {
    return false;
  }
  for (let i = 0; i < array1.length; i += 1) {
    for (let j = 0; j < array2.length; j += 1) {
      if (callback.call([array1[i], array2[j]]) === true) {
        return true;
      }
    }
  }
  return false;
};
Array.unique = (array1, array2, callback) => {
  if (Array.isEmpty(array1)) {
    return array2 || [];
  }
  if (Array.isEmpty(array2)) {
    return array1 || [];
  }
  const result = array1.concat(array2);
  for (let i = 0; i < result.length; i += 1) {
    for (let j = i + 1; j < result.length; j += 1) {
      if (!callback.call([result[i], result[j]])) {
        continue;
      }
      result.splice((j -= 1), 1);
    }
  }
  return result;
};
