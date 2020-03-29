/* eslint-disable no-sync */
/* eslint-disable no-process-exit */
const { program } = require('commander');
const fs = require('fs');

function checkSift(shift) {
  const res = parseInt(shift, 10);
  if (isNaN(res) || parseFloat(shift) !== res) {
    console.error('error: shift parameter should contain an integer value');
    process.exit(1);
  }
  return res;
}

function checkAction(action) {
  if (!['encode', 'decode'].includes(action)) {
    console.error('error: shift parameter should be encode or decode');
    process.exit(1);
  }
  return action;
}

// use synchronous operations, because it's a simple tool with no async requests
function checkFileExists(file) {
  if (!fs.existsSync(file)) {
    console.error(`error: file doesn't exist (${file})`);
    process.exit(1);
  }
  return file;
}

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <shift>', 'a shift', checkSift)
  .requiredOption(
    '-a, --action <action>',
    'an action encode/decode',
    checkAction
  )
  .option('-i, --input <input>', 'an input file', checkFileExists)
  .option('-o, --output <output>', 'an output file', checkFileExists)
  .parse(process.argv);

module.exports = program.opts();
