/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      // target: 'https://127.0.0.1:8000',
      target: 'http://lingyun.labsmart.cn/api/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/uploadAliyuncs': {
      target: "https://liyunboji-pub.oss-cn-beijing.aliyuncs.com",
      changeOrigin: true,
      pathRewrite: { '^/uploadAliyuncs': '' },
    }
  },
  // test: {
  //   '/api/': {
  //     target: 'https://preview.pro.ant.design',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  // pre: {
  //   '/api/': {
  //     target: 'your pre url',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
};
