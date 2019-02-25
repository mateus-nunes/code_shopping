const fs = require('fs');
const path = require('path');

const envsPath = "src/environments";
const envExampleDev = path.join(envsPath,'environment.example.ts');
const envExampleProd = path.join(envsPath,'environment.prod.example.ts');
const envDev= path.join(envsPath,'environment.ts');
const envProd = path.join(envsPath,'environment.prod.ts');

fs.createReadStream(envExampleDev)
    .pipe(fs.createWriteStream(envDev));

fs.createReadStream(envExampleProd)
    .pipe(fs.createWriteStream(envProd));