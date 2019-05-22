var capitalize = require('./functions');
module.exports = function(vscode, fs, path, pathdir) {
  vscode.window.showInputBox({
    prompt: 'name of helper',
    placeHolder: 'set helper name without _helper'
  }).then(function(val) {
    if (val.length == 0) {
      vscode.window.showErrorMessage('You should insert file name.');
    } else {
      var name = `${capitalize.capitalize(val)}_helper`;
      var pathfile = path.join(`${pathdir}/app/helpers`, `${name}`) + '.php';
      fs.access(pathfile, function(err) {
        if (!err) {
          vscode.window.showWarningMessage(`Name of helper ${name} already exists!`);
        } else {
          fs.open(pathfile, 'w+', function(err, fd) {
            if (err) throw err;
            fs.writeFileSync(fd, `<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Helpers ${name}
 *
 * This Helpers for ...
 * 
 * @package   CodeIgniter
 * @category  Helpers
 * @author    Setiawan Jodi <jodisetiawan@fisip-untirta.ac.id>
 * @link      https://github.com/setdjod/myci-extension/
 *
 */

// ------------------------------------------------------------------------

if (!function_exists('test')) {
  /**
   * Test
   *
   * This test helpers
   *
   * @param   ...
   * @return  ...
   */
  function test()
  {
    // 
  }
}

// ------------------------------------------------------------------------

/* End of file ${name}.php */
/* Location: ./app/helpers/${name}.php */`);
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