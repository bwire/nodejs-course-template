/* eslint-disable no-process-exit */
const { program } = require('commander');

function checkSift(shift) {
  const res = parseInt(shift, 10);
  if (isNaN(res)) {
    process.exit(1);
  }
  return res;
}

function checkAction(action) {
  if (!['encode', 'decode'].includes(action)) {
    process.exit(1);
  }
  return action;
}

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <shift>', 'a shift', checkSift)
  .requiredOption(
    '-a, --action <action>',
    'an action encode/decode',
    checkAction
  )
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .parse(process.argv);

module.exports = program.opts();
