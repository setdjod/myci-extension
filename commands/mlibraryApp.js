var capitalize = require('./functions');
module.exports = function(vscode, fs, path, pathdir) {
  vscode.window.showInputBox({
    prompt: 'name of library',
    placeHolder: 'set helper library'
  }).then(function(val) {
    if (val.length == 0) {
      vscode.window.showErrorMessage('You should insert language name.');
    } else {
      var name = capitalize.capitalize(val);
      var pathfile = path.join(`${pathdir}/app/libraries`, name) + '.php';
      fs.access(pathfile, function(err) {
        if (!err) {
          vscode.window.showWarningMessage(`Name of library ${name} already exists!`);
        } else {
          fs.open(pathfile, 'w+', function(err, fd) {
            if (err) throw err;
            fs.writeFileSync(fd, `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 *
 * Libraries ${name}
 *
 * This Libraries for ...
 * 
 * @package		CodeIgniter
 * @category	Libraries
 * @author    Setiawan Jodi <jodisetiawan@fisip-untirta.ac.id>
 * @link      https://github.com/setdjod/myci-extension/
 * @param     ...
 * @return    ...
 *
 */

class ${name}
{

  // ------------------------------------------------------------------------

  public function __construct()
  {
    // 
  }

  // ------------------------------------------------------------------------


  // ------------------------------------------------------------------------

  public function index()
  {
    // 
  }

  // ------------------------------------------------------------------------
}

/* End of file ${name}.php */
/* Location: ./app/libraries/${name}.php */`);
            fs.close(fd);
            var openPath = vscode.Uri.file(pathfile);
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