module.exports = [
  {
    context: '/api',
    target: 'https://app.ret-us-l.rnd.live.backbaseservices.com',
    secure: false,
    changeOrigin: true,
    // bypass: function (req) {
    //   req.headers['X-PRDL-BAAS'] = '%MISSING TOKEN FOR PROXY BYPASS ON ENV CONFIG%';
    // },
  },
  {
    context: '/auth',
    target: 'https://identity.ret-us-l.rnd.live.backbaseservices.com',
    secure: false,
    changeOrigin: true,
    // bypass: function (req) {
    //   req.headers['X-PRDL-BAAS'] = '%MISSING TOKEN FOR PROXY BYPASS ON ENV CONFIG%';
    // },
  },
];
