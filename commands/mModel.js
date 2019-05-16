var capitalize = require('./functions');
module.exports = function(vscode, fs, path, pathdir) {
  vscode.window.showInputBox({
    prompt: 'name of model',
    placeHolder: 'set model model'
  }).then(function(val) {
    if (val.length == 0) {
      vscode.window.showErrorMessage('You should insert file name.');
    } else {
      var pathfile = path.join(`${pathdir}/app/models`, capitalize.capitalize(val)) + '.php';
      fs.access(pathfile, function(err) {
        if (!err) {
          vscode.window.showWarningMessage('Name of file already exists!');
        } else {
          fs.open(pathfile, 'w+', function(err, fd) {
            if (err) throw err;
            fs.writeFileSync(fd, `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ${capitalize.capitalize(val)}_model extends CI_Model {
    
  public function __construct()
  {
    parent::__construct();
  }
  
  /**
   *
   * Model ${capitalize.capitalize(val)}
   *
   * @author  Setiawan Jodi <jodisetiawan@fisip-untirta.ac.id>
   * @param   ...
   * @return  ...
   *
   */

  public function index()
  {
    // 
  }

}

/* End of file ${capitalize.capitalize(val)}.php */
/* Location: ./app/models/${capitalize.capitalize(val)}.php */`);
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