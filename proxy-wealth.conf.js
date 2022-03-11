module.exports = [
  {
    context: '/api',
    target: 'https://app.ret-wlt-l.rnd.live.backbaseservices.com',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      req.headers['X-PRDL-BAAS'] = 'prdl-ret-wlt-l-17a16e8b-0bfc-42a3-9ed3-37138e80c022';
    },
  },
  {
    context: '/auth',
    target: 'https://identity.ret-wlt-l.rnd.live.backbaseservices.com',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      req.headers['X-PRDL-BAAS'] = 'prdl-ret-wlt-l-17a16e8b-0bfc-42a3-9ed3-37138e80c022';
    },
  },
];
