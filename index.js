const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Path to input JSON file')
  .option('-o, --output <path>', 'Path to output file')
  .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Читання JSON-файлу
const rawData = fs.readFileSync(options.input);
const data = JSON.parse(rawData);

// Пошук активу з найменшим значенням
const minAsset = data.reduce((min, asset) => 
  asset.value < min.value ? asset : min
);

const result = `${minAsset.txt}: ${minAsset.value}`;

if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result);
}
