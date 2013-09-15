$(document).ready(function() {
	// Las palabras correctas por orden
	var values = [ 'Mancha', 'acordarme', 'astillero', 'corredor' ];
	
	// Recuperamos el historial almacenado en local	
	var history = JSON.parse(localStorage.getItem('history'));

	// Si no existe historial, creamos un array sin contenido
	if (history === null) {
		history = [];
	} else {
		// Como existe historial, lo recorremos para mostrar por pantalla
		// cada elemento del historial en la zona correcta del HTML.
		$.each(history, function(key, value) {
			$("#history article").append(value);
		});
	}

  // Contenido que se ejecuta al clicar en "comprobar"
  $('#check').click(function() {

		var checked = 0;
		var right = 0;
		var text = '';

		// Recorremos cada span del texto para compararlo con su valor.
    $("#text span").each(function() {
			// Si la palabra es correcta, sumamos 1 a right.
			if ($(this).html() == values[checked]) {
				right += 1;
			}
			// Sumamos 1 a la variable de "spans comprobados".
			checked += 1;
		});

		if (right == checked) {
		  // Si la frase es correcta, establecemos el texto a incorporar 
			// al historial dentro de una etiqueta con class "correct"
			// para que el pintado tenga un borde verde
			text = '<div class="correct">' + $("#text").html() + '</div>';
		} else {
		  // Si la frase no es correcta, establecemos el texto a incorporar 
			// al historial dentro de una etiqueta con class "error"
			// para que el pintado tenga un borde rojo.
			text = '<div class="error">' + $("#text").html() + '</div>';
		}

		// Incorporamos el texto al array que almacenaremos en local.
		history.push(text);

		// Incorporamos el texto al historial por pantalla.
  	$("#history article").append(text);

		// Guardamos en local (localStorage) el array history
  	localStorage.setItem('history', JSON.stringify(history));
		
		if (right == checked) {
			alert('Good Job!');
		} else {
			alert('You failed!');
		}
  });

	// Contenido que se ejecuta al clicar en "reiniciar"
	$("#restart").click(function() {
		// Eliminamos el elemento "history" del almacenamiento local.
		localStorage.removeItem('history');
		// Vaciamos el historial mostrado por pantalla.
		$("#history article").html('');
	});

});