jQuery(document).ready(function(){
	jQuery('.register').on('click', function(){
		var formdata = jQuery("form").serialize();
		console.log(formdata);
	})
})