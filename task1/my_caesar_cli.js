const { Transform, pipeline } = require('stream');
const fs = require('fs');

const codec = require('./codec');
const options = require('./options');

const action = new Transform({
  transform(chunk, encoding, callback) {
    const codecFn = codec(options.shift)[options.action];
    this.push(
      chunk
        .toString()
        .split('')
        .map(token => codecFn(token))
        .join('')
    );
    callback();
  }
});

pipeline(
  options.input ? fs.createReadStream(options.input) : process.stdin,
  action,
  options.output
    ? fs.createWriteStream(options.output, { flags: 'a+' })
    : process.stdout,
  error => {
    if (error) {
      console.error(error.message);
    }
  }
);
