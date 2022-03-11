module.exports = [
  {
    context: '/api',
    target: 'https://app.bus-us-s.rnd.live.backbaseservices.com',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      req.headers['X-PRDL-BAAS'] = 'prdl-bus-us-s-53149976-eed5-4070-bc19-42d9879c098d';
    },
  },
  {
    context: '/auth',
    target: 'https://identity.bus-us-s.rnd.live.backbaseservices.com',
    secure: false,
    changeOrigin: true,
    bypass: function (req) {
      req.headers['X-PRDL-BAAS'] = 'prdl-bus-us-s-53149976-eed5-4070-bc19-42d9879c098d';
    },
  },
];
