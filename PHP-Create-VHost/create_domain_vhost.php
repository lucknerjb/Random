<?php
$length = 10;
$config_path = "/home/user123/domain_confs/";
$conf_template = "./vhost_template.conf";

//Read the conf file
$conf_content = $this->read_file_contents($conf_template);

//Replace the "{DOMAIN}" tags with the actual domain name
$conf_content = str_replace('{DOMAIN}', $domain, $conf_content);

//Create the conf file name
$conf_file = $domain;
$conf_file = str_replace('.', '_', $conf_file);
$conf_file .= ".conf";

//Build file location
$conf_file = $config_path . $conf_file;

//Get current data
$cur_date = date('Ymd');

//Write the config file
touch($conf_file);
$fh = fopen($conf_file, 'w');
if ($fh){
	$conf_content = "# Created by XYZ Domain Creation Script\n"
		. "# Domain: $domain\n"
		. "# Date: $cur_date\n\n#########################################################\n\n"
		. $conf_content;

	fwrite($fh, $conf_content);
}

//Create directory
if (@mkdir("$domains_dir/$domain", 0755) == false) {
	return "Domain Directory Creation Error: <strong>Could not create domain directory</strong><br />";
}

 //Get PHP User and Group
$PHP_USER = Configure::read('PHP_USER');
$PHP_GROUP = Configure::read('PHP_GROUP');

//chown("/home/user123/$domains_dir/$domain", $PHP_USER);

//Create the error logs fodlers for this domain
exec("cp $htaccess_template $domains_dir/$domain/.htaccess");
exec("ln -s $domains_dir/$domain $def_web_dir/$domain\_domain");  //For testing purposes only
@mkdir("/home/user123/logs/$domain");
@mkdir("/home/user123/logs/$domain/http.18318660");
@touch("/home/user123/logs/$domain/http.18318660/error.log");


//Create index page to send user to home.php instead of listing dir
$fh = fopen("$domains_dir/$domain/index.php", 'w');
fwrite($fh, '<?php header("Location: home"); ?>');
fclose($fh);
?>
