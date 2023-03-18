
const program = require('commander');

const {name, version, description} = require('../package.json')
const {stringReplace }= require('../src/stringReplace')

program
    .name(name)
    .description(description)
    .version(version)
    .option('-p, --pattern <string>', 'file pattern')

program.parse(process.argv);

const {pattern} = program.opts();

try{
    if(process.argv.length == 2){
        throw new Error('No arguments supplied')
    }
    stringReplace(pattern);
} catch(error) {
    console.error("\nError: %s\n", error.message)
}

