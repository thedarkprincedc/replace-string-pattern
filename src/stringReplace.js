const envsub = require('envsub');
const fs = require('fs');
const path = require('path');
const { globSync} = require('glob');

const tempFolderPrefix = 'temp-';
const tempFolderPattern = `./${tempFolderPrefix}*`
const options = {
    diff: true,
    all: true,
    protect: true,
    system: true
}

function replaceEnvVarsInFile(templateFile, destFolderPath, options){
    const outputFile = path.resolve(`${destFolderPath}/${path.basename(templateFile)}`)
    envsub({templateFile, outputFile, options})
        .then((envObj) => console.log(envObj) )
        .catch((err) => console.error(err.message))
}

function stringReplace(pattern){
    const files = globSync(pattern, {})
    const tempFolders = globSync(tempFolderPattern, {})
    
    // clear all temp folders
    tempFolders.forEach(v => fs.rmSync(v, { recursive: true }) )
    
    // create new temp folder
    const destFolderPath = fs.mkdtempSync(tempFolderPrefix)

    // // loop through each file and replace env variables
    files.forEach(file => replaceEnvVarsInFile(file, destFolderPath, options))
}

module.exports = {
    stringReplace
}