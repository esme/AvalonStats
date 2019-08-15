const NodeCache = require('node-cache');

const myCache = new NodeCache();

const get = key => myCache.get(key, (err, value) => {
  if (!err) {
    return value;
  }
  return false;
});

const set = (key, val) => {
  myCache.set(key, val, (err, success) => {
    if (!err && success) {
      console.log('success', key, val, success);
    } else {
      console.log(err);
    }
  });
};

const cache = async (req, res, next) => {
  const { id } = req.params;
  if (req.method === 'POST') {
    await set(id, req.params);
  } else {
    const val = await get(id);
    if (val) {
      req.darkTheme = val.darkTheme;
    }
  }
  next();
};

module.exports = cache;
