
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: [
  {
    "renderMode": 1,
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/category"
  },
  {
    "renderMode": 1,
    "route": "/summary"
  },
  {
    "renderMode": 1,
    "route": "/rates"
  },
  {
    "renderMode": 1,
    "route": "/policy"
  },
  {
    "renderMode": 1,
    "route": "/register"
  },
  {
    "renderMode": 1,
    "route": "/discount/:ticketNumber"
  },
  {
    "renderMode": 1,
    "route": "/full-summary/:ticketNumber"
  },
  {
    "renderMode": 1,
    "route": "/dashboard"
  }
],
  assets: new Map([
['index.csr.html', {size: 7352, hash: '4e56d95e26d628cec99468ad3321237a13d31c8d3a948488bad66d8e2de16cc9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 1449, hash: '3724fb63d145377dbe4cf66523b1b39e9a7009bc1db02ff8b7670c8ea5a96d8d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-V3HSRCF6.css', {size: 22626, hash: 'p0XlkZkZpWg', text: () => import('./assets-chunks/styles-V3HSRCF6_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
