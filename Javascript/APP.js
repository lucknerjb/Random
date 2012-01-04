var $APP = {
	call: function(){
		alert('call');
	}, 
	find: function($elem){
		//Create an object containing the element we are looking for. Return it
		$obj = $ide_iframe.contents().find( $elem );
		return $obj;
	}, 
	generateMessage: function($msg){
		//Get the user's language
		$lang = $conf['lang'];

		switch($lang){
			case 'en':
				return $msg.en;
				break;
			case 'fr':
				return $msg.fr;
				break;
			default:
		}
	}, 
	validate_input: function($input){
		/**
		/w is a set option that valiadtes alphanum only. Added space and dash as acceptable characters. Will allow others later on maybe
		*/
    	// validation fails if the input is blank
    	if($input == '') {
      	return false;
    	}

    	// regular expression to match only alphanumeric characters and spaces
    	var $regex = /^[\w- ]+$/;
    
    	// validation fails if the input doesn't match our regular expression
    	if(!$regex.test($input)) {
      	return false;
   	}
  
    	// validation was successful
   	return true;
  	}, 
	updateLogo: function($attr, $val){
		switch($attr){
			case 'width':
				this.updateLogoWidth($val);
				break;
			case 'height':
				this.updateLogoHeight($val);
				break;
			case 'src':
				this.updateLogoSrc($val);	//TO CODE
				break;
			case 'alt':
				this.updateLogoAlt($val);	//TO CODE
				break;
		}
	}, 
	updateLogoWidth: function($val){
		//Update the logo width
		this.find( '#logo img' ).width( $val );

		//Save the logo width in $site to be accessible when we save
		$site['logo_width'] = $val;
	}, 
	updateLogoHeight: function($val){
		//Update the logo height
		this.find( '#logo img' ).height( $val );

		//Save the logo height in $site to be accessible when we save
		$site['logo_height'] = $val;
	}, 
	getViewportHeight: function(){
		return $( window ).height();
	},
	getViewportWidth: function(){
		return $( window ).width();
	},
	getViewportScrollTop: function(){
		return $( window ).scrollTop();
	},
	getViewportScrollLeft: function(){
		return $( window ).scrollLeft();
	}, 
	toHex: function($rgb){
		var hexDigits = new Array
      ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

		//Function to convert hex format to a rgb color
		function rgb2hex(rgb) {
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}

		function hex(x) {
			return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
		}

		return rgb2hex($rgb);
	} 
}
