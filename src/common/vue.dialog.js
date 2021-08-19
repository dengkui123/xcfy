const Notice = {
  max: 3,
  success: [],
  info: [],
  warning: [],
  error: [],
  push(type, name) {
    if (['success', 'info', 'warning', 'error'].indexOf(type) === -1) {
      return false;
    }
    if (Array.isEmpty(Notice[type])) {
      Notice[type] = [];
    }
    if (Notice[type].length >= Notice.max) {
      const removeName = Notice[type].shift();
      dialog.closeNotice(removeName);
    }
    Notice[type].push(name);
    return true;
  },
  close(type, name) {
    if (Array.isEmpty(Notice[type])) {
      Notice[type] = [];
      return;
    }
    const index = Notice[type].indexOf(name);
    if (index > -1) {
      Notice[type].splice(index, 1);
    }
    dialog.closeNotice(name);
  },
};
const dialog = {
  toast(msg) {
    window.$vApp.vueInst.$message(msg);
  },
  error(msg) {
    window.$vApp.vueInst.$message.error(msg);
  },
  loading(message = '加载中', withoutTimeout) {
    const loading = window.$vApp.vueInst.$loading({
      lock: true,
      text: message,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    let timeout = 0;
    if (!withoutTimeout === true) {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        loading.close();
      }, 30000);
    }
    return () => {
      clearTimeout(timeout);
      loading.close();
    };
  },
  success(message, clear) {
    if (String.isEmpty(message)) {
      return null;
    }
    const name = window.$vApp.vueInst.$uuid();
    if (clear) {
      dialog.destroyNotice(name);
    } else {
      Notice.push('success', name);
    }
    window.$vApp.vueInst.$notify({
      type: 'success',
      customClass: name,
      title: '成功',
      message,
      duration: 2000,
      onClose() {
        Notice.close('success', name);
      },
    });
    return name;
  },
  info(message, clear) {
    if (String.isEmpty(message)) {
      return null;
    }
    const name = window.$vApp.vueInst.$uuid();
    if (clear) {
      dialog.destroyNotice(name);
    } else {
      Notice.push('info', name);
    }
    window.$vApp.vueInst.$notify({
      customClass: name,
      type: 'info',
      title: '提示',
      message,
      duration: 3000,
      onClose() {
        Notice.close('info', name);
      },
    });
    return name;
  },
  warning(message, clear) {
    if (String.isEmpty(message)) {
      return null;
    }
    const name = window.$vApp.vueInst.$uuid();
    if (clear) {
      dialog.destroyNotice(name);
    } else {
      Notice.push('warning', name);
    }
    window.$vApp.vueInst.$notify({
      type: 'warning',
      customClass: name,
      title: '警告',
      message,
      duration: 3000,
      onClose() {
        Notice.close('warning', name);
      },
    });
    return name;
  },
  // error(message, clear) {
  //   console.log('message', message);
  //   if (String.isEmpty(message)) {
  //     return null;
  //   }
  //   const name = window.$vApp.vueInst.$uuid();
  //   if (clear) {
  //     dialog.destroyNotice(name);
  //   } else {
  //     Notice.push('error', name);
  //   }
  //   window.$vApp.vueInst.$notify({
  //     type: 'error',
  //     title: '错误',
  //     customClass: name,
  //     message,
  //     duration: 3000,
  //     onClose() {
  //       Notice.close('error', name);
  //     },
  //   });
  //   return name;
  // },
  closeNotice(name) {
    if (String.isEmpty(name)) {
      return;
    }
    window.$vApp.vueInst.$notify.close(name);
  },
  destroyNotice(name) {
    window.$vApp.vueInst.$notify.close(name);
  },
  confirm(message, callback) {
    return new Promise((resolve, reject) => {
      if (String.isEmpty(message)) {
        reject();
        return;
      }
      window.$vApp.vueInst.$Modal.confirm({
        title: '操作确认',
        content: message,
        onOk: () => {
          resolve(true);
          if (!Object.isFunction(callback)) {
            return;
          }
          callback.apply(window.$vApp.vueInst, [true]);
        },
        onCancel: () => {
          resolve(false);
          if (!Object.isFunction(callback)) {
            return;
          }
          callback.apply(window.$vApp.vueInst, [false]);
        },
      });
    });
  },
  /**
   *
   * @param placeholder
   * @param config
   * @param callback
   * @param config.appearance Input,InputNumber
   */
  prompt(
    placeholder = '请输入',
    config = {
      appearance: 'Input',
      placeholder: '请输入',
      required: false,
    },
    callback
  ) {
    let {appearance} = config;
    if (String.isEmpty(appearance)) {
      appearance = 'Input';
    }
    let inputValue = config.value;
    window.$vApp.vueInst.$Modal.confirm({
      title: placeholder,
      render: (h) => {
        if (appearance === 'Input') {
          return h('Input', {
            props: {
              value: inputValue,
              type: config.type,
              rows: config.rows,
              maxlength: config.maxlength,
              autofocus: true,
              placeholder: config.placeholder,
            },
            style: {
              width: '100%',
              'margin-top': '20px',
            },
            on: {
              input(val) {
                inputValue = val;
              },
            },
          });
        }
        if (appearance === 'VInput') {
          return h('VInput', {
            props: {
              value: inputValue,
              type: config.type,
              rows: config.rows,
              maxlength: config.maxlength,
              autofocus: true,
              placeholder: config.placeholder,
            },
            style: {
              width: '100%',
              'margin-top': '20px',
            },
            on: {
              input(val) {
                inputValue = val;
              },
            },
          });
        }
        if (appearance === 'InputNumber') {
          const precision = Number.parseIntWithDefault(config.precision, 0);
          if (precision > 0) {
            inputValue = Number.parseFloatWithDefault(config.min, 0, precision);
          } else {
            inputValue = Number.parseIntWithDefault(config.min, 0);
          }
          return h('InputNumber', {
            props: {
              value: inputValue,
              autofocus: true,
              placeholder,
              min: config.min,
              max: config.max,
              step: config.step,
              precision,
            },
            style: {
              width: '100%',
              'margin-top': '10px',
            },
            on: {
              input(val) {
                inputValue = val;
              },
            },
          });
        }
        return h('');
      },
      onOk() {
        if (!Object.isFunction(callback)) {
          return;
        }
        if (config.required && String.isEmpty(inputValue)) {
          this.$dialog.warning(placeholder);
          return;
        }
        callback.apply(null, [{value: inputValue}]);
      },
    });
  },
};

export default dialog;
