$(document).ready(function(){
	$.getJSON("http://localhost:3000/json.json", function(data){
		var classe = data['images'][0]['classifiers'][0]['classes'][0]['class']
		console.log(classe)
		if(classe=="Loiro_m"){
			classe = "Menino Loiro"	
		}else{
			classe = "Menina Morena"
		}
		
		$('#classe').text('Perfil identificado: '+classe)
	})
	$('#resultado').css("background-image", "url(../filename.jpg)");
})