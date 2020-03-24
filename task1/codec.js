module.exports = function codec(shift) {
  function fn(mult) {
    const alphabet_l = 'abcdefghijklmnopqrstuvwxyz';
    const alphabet_u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return function result(token) {
      const alphabet = token === token.toUpperCase() ? alphabet_u : alphabet_l;
      return alphabet.includes(token)
        ? alphabet.charAt((alphabet.indexOf(token) + shift * mult) % 26)
        : token;
    };
  }
  return {
    encode: fn(1),
    decode: fn(-1)
  };
};
