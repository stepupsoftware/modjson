#!/usr/bin/env node
var antlr4 = require("antlr4");
var walker = antlr4.tree.ParseTreeWalker.DEFAULT;
var fs = require('fs');
var JSONLexer = require('./JSONLexer');
var JSONParser = require('./JSONParser');
var input = fs.readFileSync(process.cwd() + '/source.json', 'utf8');
var chars = new antlr4.InputStream(input);
var lexer = new JSONLexer.JSONLexer(chars);
var tokens = new antlr4.CommonTokenStream(lexer);
var parser = new JSONParser.JSONParser(tokens);
var Listener = require('./CustomListener');
parser.buildParseTrees = true;
var tree = parser.json();
var printer = new Listener();
walker.walk(printer, tree);
console.log(printer.output);