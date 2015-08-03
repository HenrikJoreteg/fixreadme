#!/usr/bin/env node
var pack = require(process.cwd() + '/package.json');
var tryit = require('tryit');
var fs = require('fs');
var readFile = function (path) {
    var res = '';
    tryit(function () {
        res = fs.readFileSync(path, {encoding: 'utf8'});
    });
    return res;
}
var writeFile = fs.writeFileSync;
var fileName = process.cwd() + '/README.md';
var shields = ['npm/dm', 'npm/v', 'npm/l']

function hasSection(string, section) {
    return string.indexOf('## ' + section) !== -1;
}

function shieldImg(type, name) {
    return '![](https://img.shields.io/' + type + '/' + name + '.svg)'
}

var readme = readFile(fileName);

if (!readme) {
    readme += ('# ' + pack.name + '\n\n');
    readme += (shields.map(function (type) { return shieldImg(type, pack.name) }).join('') + '\n\n')
    readme += pack.description + '\n\n';
}

if (!hasSection(readme, 'install')) {
    readme += ('## install\n\n```\nnpm install ' + pack.name + '\n```\n\n');
}

if (!hasSection(readme, 'example')) {
    readme += ('## example\n\n```javascript\nvar ' + pack.name + ' = require(\'' + pack.name + '\');\n```\n\n');
}

if (!hasSection(readme, 'credits')) {
    readme += ('## credits\n\nIf you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.\n\n');
}

if (!hasSection(readme, 'license')) {
    readme += ('## license\n\n[MIT](http://mit.joreteg.com/)\n\n')
}

writeFile(fileName, readme);

