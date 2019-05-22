var capitalize = require('./functions');
const fsa = require('fs');
module.exports = function(vscode, fs, path, pathdir) {
  vscode.window.showInputBox({
    prompt: 'language name',
    placeHolder: 'set language name without _lang'
  }).then(function(lang) {
    if (lang.length == 0) {
      vscode.window.showErrorMessage('You should insert language name.');
    } else {
      var pathlang = path.join(`${pathdir}/app/language`, lang);
      fs.access(pathlang, function(err) {
        if (err) fsa.mkdirSync(pathlang);
        vscode.window.showInputBox({
          prompt: 'file name',
          placeHolder: 'set file name'
        }).then(function(val) {
          if (val.length == 0) {
            vscode.window.showErrorMessage('You should insert file name.');
          } else {
            var name = `${capitalize.capitalize(val)}_lang`;
            var pathfile = path.join(`${pathdir}/app/language`, `${lang}/${name}`) + '.php';
            fs.access(pathfile, function(err) {
              if (!err) {
                vscode.window.showWarningMessage(`Name of language ${name} already exists!`);
              } else {
                fs.open(pathfile, 'w+', function(err, fd) {
                  if (err) throw err;
                  fs.writeFileSync(fd, `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$lang['test'] = 'test'; 

/* End of file ${name}.php */
/* Location: ./app/language/${name}.php */`);
                  fs.close(fd);
                });
                var openPath = vscode.Uri.file(pathfile);
                vscode.workspace.openTextDocument(openPath).then(function(val) {
                  vscode.window.showTextDocument(val);
                });
                vscode.window.showInformationMessage('Created successfully! ');
              }
            });
          }
        });
      });
    }
  });
};