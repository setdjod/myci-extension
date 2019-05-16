module.exports = function(vscode, fs, path, pathdir) {
  var pathfile = path.join(pathdir, '.htaccess');
  fs.access(pathfile, function(err) {
    if (!err) {
      vscode.window.showWarningMessage('.htaccess already exists!');
    } else {
      fs.open(pathfile, 'w+', function(err, fd) {
        if (err) throw err;
        fs.writeFileSync(fd, `<IfModule mod_rewrite.c>
	# Make sure directory listing is disabled
	Options +FollowSymLinks -Indexes
	RewriteEngine on

	# NOTICE: If you get a 404 play with combinations of the following commented out lines
	#AllowOverride All
	#RewriteBase /wherever/codeginiter/is

	# Restrict your site to only one domain
	# !important USE ONLY ONE OPTION

	# Option 1: To rewrite "www.domain.com -> domain.com" uncomment the following lines.
	#RewriteCond %{HTTPS} !=on
	#RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
	#RewriteRule ^(.*)$ http://%1/$1 [R=301,L]

	# Option 2: To rewrite "domain.com -> www.domain.com" uncomment the following lines.
	#RewriteCond %{HTTPS} !=on
	#RewriteCond %{HTTP_HOST} !^www\\..+$ [NC]
	#RewriteCond %{HTTP_HOST} (.+)$ [NC]
	#RewriteRule ^(.*)$ http://www.%1/$1 [R=301,L]

	# Force SSL
	#RewriteCond %{HTTPS} off
	#RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

	# Remove index.php from URL
	RewriteCond %{HTTP:X-Requested-With}	!^XMLHttpRequest$
	RewriteCond %{THE_REQUEST}				^[^/]*/index\\.php [NC]
	RewriteRule ^index\\.php(.*)$			$1 [R=301,NS,L]

	# Keep people out of codeigniter directory and Git/Mercurial data
	RedirectMatch 403 ^/(system|\\.git|\\.hg|\\.env).*$

	# Send request via index.php (again, not if its a real file or folder)
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d

	<IfModule mod_php5.c>
		RewriteRule ^(.*)$ index.php/$1 [L]
	</IfModule>

	<IfModule !mod_php5.c>
		RewriteRule ^(.*)$ index.php?/$1 [L]
	</IfModule>

</IfModule>`);
        fs.close(fd);
      });
      var openPath = vscode.Uri.file(pathfile); //A request file path
      vscode.workspace.openTextDocument(openPath).then(function(val) {
        vscode.window.showTextDocument(val);
      });
      vscode.window.showInformationMessage('Created successfully! ');
    }
  });
};