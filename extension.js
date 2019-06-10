/* eslint-disable no-console */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const mController = require('./commands/mController');
const mControllerApp = require('./commands/mControllerApp');
const mModel = require('./commands/mModel');
const mModelApp = require('./commands/mModelApp');
const mHelper = require('./commands/mHelper');
const mHelperApp = require('./commands/mHelperApp');
const mLibrary = require('./commands/mlibrary');
const mLibraryApp = require('./commands/mlibraryApp');
const mLanguage = require('./commands/mLanguage');
const mLanguageApp = require('./commands/mLanguageApp');
const mHtaccess = require('./commands/mHtaccess');
let pathwork = vscode.workspace.workspaceFolders[0].uri.fsPath;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {


  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(pathwork);

  console.log('codeigniter-extension is active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let controller = vscode.commands.registerCommand('make.controller', function() {
    mController(vscode, fs, path, pathwork);

  });

  let controllerApp = vscode.commands.registerCommand('make.controllerApp', function() {
    mControllerApp(vscode, fs, path, pathwork);

  });

  let model = vscode.commands.registerCommand('make.model', function() {
    mModel(vscode, fs, path, pathwork);

  });

  let modelApp = vscode.commands.registerCommand('make.modelApp', function() {
    mModelApp(vscode, fs, path, pathwork);

  });

  let helper = vscode.commands.registerCommand('make.helper', function() {
    mHelper(vscode, fs, path, pathwork);
  });

  let helperApp = vscode.commands.registerCommand('make.helperApp', function() {
    mHelperApp(vscode, fs, path, pathwork);
  });

  let library = vscode.commands.registerCommand('make.library', function() {
    mLibrary(vscode, fs, path, pathwork);
  });

  let libraryApp = vscode.commands.registerCommand('make.libraryApp', function() {
    mLibraryApp(vscode, fs, path, pathwork);
  });

  let language = vscode.commands.registerCommand('make.language', function() {
    mLanguage(vscode, fs, path, pathwork);
  });
  
  let languageApp = vscode.commands.registerCommand('make.languageApp', function() {
    mLanguageApp(vscode, fs, path, pathwork);
  });

  let htaccess = vscode.commands.registerCommand('make.htaccess', function() {
    mHtaccess(vscode, fs, path, pathwork);
  });

  context.subscriptions.push(controller);
  context.subscriptions.push(controllerApp);
  context.subscriptions.push(model);
  context.subscriptions.push(modelApp);
  context.subscriptions.push(helper);
  context.subscriptions.push(helperApp);
  context.subscriptions.push(library);
  context.subscriptions.push(libraryApp);
  context.subscriptions.push(language);
  context.subscriptions.push(languageApp);
  context.subscriptions.push(htaccess);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;