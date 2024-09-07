module.exports = (moduleType) => {
  return require(`./${moduleType}/index.js`);
};
