var capitalize = require('./functions');
module.exports = function(vscode, fs, path, pathdir) {
  vscode.window.showInputBox({
    prompt: 'name of helper',
    placeHolder: 'set helper model'
  }).then(function(val) {
    if (val.length == 0) {
      vscode.window.showErrorMessage('You should insert file name.');
    } else {
      var pathfile = path.join(`${pathdir}/app/helpers`, `${capitalize.capitalize(val)}_helper`) + '.php';
      fs.access(pathfile, function(err) {
        if (!err) {
          vscode.window.showWarningMessage('Name of file already exists!');
        } else {
          fs.open(pathfile, 'w+', function(err, fd) {
            if (err) throw err;
            fs.writeFileSync(fd, `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 *
 * Helpers ${capitalize.capitalize(val)}
 *
 * @author  Setiawan Jodi <jodisetiawan@fisip-untirta.ac.id>
 * @param   ...
 * @return  ...
 *
 */

function ${capitalize.capitalize(val)}()
{
}

/* End of file ${capitalize.capitalize(val)}.php */
/* Location: ./app/helpers/${capitalize.capitalize(val)}.php */`);
            fs.close(fd);
            var openPath = vscode.Uri.file(pathfile); //A request file path
            vscode.workspace.openTextDocument(openPath).then(function(val) {
              vscode.window.showTextDocument(val);
            });
          });
          vscode.window.showInformationMessage('Created successfully! ');
        }
      });
    }
  });
};