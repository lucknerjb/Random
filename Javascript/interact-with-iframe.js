//$ide object comes from the ide.js file

//START IFRAME LOAD
$ide_iframe = '#iframe_name';
$ide_iframe.load(function(){
	//Hide the body of the iframe - render a white page essentially
	$ide.find( 'body' ).hide();

	//Detect browser
	$browser = BrowserDetect.browser;

	//Add the CSS files for application_controls.css and some JS files - browser dependant
	//Random number appended to file name to avoid caching
	var $randomNumber=Math.floor(Math.random()*100001);
	if ($browser = 'Explorer'){
		$ide.find( 'head' ).append( '<link href="' + $server + '/css/ie/application_controls.css?ver=' + $randomNumber + '" rel="stylesheet" type="text/css" />' );
	}else{
		$ide.find( 'head' ).append( '<link href="' + $server + '/css/application_controls.css?ver=' + $randomNumber + '" rel="stylesheet" type="text/css" />' );
	}
});
