var capitalize = require('./functions');
module.exports = function(vscode, fs, path, pathdir) {
  vscode.window.showInputBox({
    prompt: 'name of controller',
    placeHolder: 'set controller name'
  }).then(function(val) {
    if (val.length == 0) {
      vscode.window.showErrorMessage('You should insert file name.');
    } else {
      var name = capitalize.capitalize(val);
      var pathfile = path.join(`${pathdir}/app/controllers`, name) + '.php';
      fs.access(pathfile, function(err) {
        if (!err) {
          vscode.window.showWarningMessage(`Name of controller ${name} already exists!`);
        } else {
          fs.open(pathfile, 'w+', function(err, fd) {
            if (err) throw err;
            fs.writeFileSync(fd, `<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 *
 * Controller ${name}
 *
 * This controller for ...
 *
 * @package   CodeIgniter
 * @category  Controller
 * @author    Setiawan Jodi <jodisetiawan@fisip-untirta.ac.id>
 * @link      https://github.com/setdjod/myci-extension/
 * @param     ...
 * @return    ...
 *
 */

class ${name} extends CI_Controller
{
    
  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    // 
  }

}


/* End of file ${name}.php */
/* Location: ./app/controllers/${name}.php */`);
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