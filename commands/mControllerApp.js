var capitalize = require('./functions');
module.exports = function(vscode, fs, path, pathdir) {
    vscode.window.showInputBox({
        prompt: 'name of controller',
        placeHolder: 'set controller name'
    }).then(function(val) {
        if (val.length == 0) {
            vscode.window.showErrorMessage('You should insert file name.');
        } else {
            vscode.window.showInputBox({
                prompt: 'type of controller',
                placeHolder: 'set controller type | ex:CI/REST (default: CI)'
            }).then(function(valType) {
                if (valType.length == 0) {
                    var type = 'CI';
                    var comment = '';
                } else {
                    var type = valType.toUpperCase();
                    var comment = "// Don't forget include/define REST_Controller path";
                }
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
${comment}

/**
 *
 * Controller ${name}
 *
 * This controller for ...
 *
 * @package   CodeIgniter
 * @category  Controller ${type}
 * @author    Setiawan Jodi <jodisetiawan@fisip-untirta.ac.id>
 * @author    Raul Guerrero <r.g.c@me.com>
 * @link      https://github.com/setdjod/myci-extension/
 * @param     ...
 * @return    ...
 *
 */

class ${name} extends ${type}_Controller
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
            });
        }
    });
};