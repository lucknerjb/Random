//Get the current path
var $path = document.location.href.split('/');

//Get the WWW and domain
$www = $path[2].substr(0, 3);
$domain = $path[2];

//Split the domain on the periods and grab the first element. This will allow us to know what the environment is
$domain_parts = $domain.split('.');

$env = $domain_parts[0];

//Set the server value depending on the environment
switch($env){
	case 'www':
		$server_val = 'http://mydomain.com';
		$server_www_val = 'http://www.mydomain.com';
		break;
	case 'dev':
		$server_val = 'http://dev.mydomain.com';
		$server_www_val = 'http://dev.mydomain.com';
		break;
	case 'test':
		$server_val = 'http://test.mydomain.com';
		$server_www_val = 'http://test.mydomain.com';
		break;
}

//Build the config variable
var $conf = {
   //Default server info
   server: $server_val,
   server_with_www: $server_www_val
	//....
	//....
	//....
}
