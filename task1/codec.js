module.exports = function codec(shift) {
  function fn(mult) {
    return function result(token) {
      const alphabet =
        token === token.toUpperCase()
          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          : 'abcdefghijklmnopqrstuvwxyz';
      return alphabet.includes(token)
        ? alphabet.charAt((alphabet.indexOf(token) + shift * mult + 26) % 26)
        : token;
    };
  }
  return {
    encode: fn(1),
    decode: fn(-1)
  };
};
