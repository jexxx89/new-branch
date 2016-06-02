$(document).ready(function(){
	$('#clients-table').dataTable({'pageLength':50, 'order':[[0, 'asc']]});
	$('#products-table').dataTable({'pageLength':50, 'order':[[0, 'asc']]});
	$('#orders-table').dataTable({'pageLength':50, 'order':[[0, 'desc']]});
	$('#user-orders-table').dataTable({'pageLength':50, 'order':[[0, 'desc']]});
	$('#print-btn').click(function(event){
		event.preventDefault();
		window.print();
	});
	$('.datepicker').datepicker({format: 'yyyy-mm-dd'});
});

$(document).on('click', '#add-client', function(event){
	event.preventDefault();
	$('#add-client-form-wrapper').fadeIn();
});
$(document).on('click', '#close-add-client-form-wrapper', function(event){
	event.preventDefault();
	$('#add-client-form-wrapper').fadeOut();
});
$(document).on('submit', '#add-client-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/insert-client.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Client adaugat cu succes!');
			window.location.reload();
		}
	});
});

$(document).on('click', '#add-product', function(event){
	event.preventDefault();
	$('#add-product-form-wrapper').fadeIn();
});
$(document).on('click', '#close-add-product-form-wrapper', function(event){
	event.preventDefault();
	$('#add-product-form-wrapper').fadeOut();
});
$(document).on('submit', '#add-product-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/insert-product.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Produs adaugat cu succes!');
			//window.location.reload();
		}
	});
});

$(document).on('submit', '#edit-client-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/update-client.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Clientul a fost actualizat!');
			window.location.reload();
		}
	});
});

$(document).on('click', '.delete-client', function(event){
	event.preventDefault();
	var id = $(this).attr('id');
	$.post('ajax/delete-client.php', {id:id}, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Clientul si comenzile aferente au fost sterse!');
			window.location.href = 'admin.php?p=clienti';
		}
	});
});

$(document).on('submit', '#edit-product-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/update-product.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Produsul a fost actualizat!');
			window.location.reload();
		}
	});
});

$(document).on('click', '#add-order', function(event){
	event.preventDefault();
	$('#add-order-form-wrapper').fadeIn();
});
$(document).on('click', '#close-add-order-form-wrapper', function(event){
	event.preventDefault();
	$('#add-order-form-wrapper').fadeOut();
});
$(document).on('click', '#add-line', function(event){
	event.preventDefault();
	$.get('ajax/order-line.php', function(response){
		$('#product-group').append(response);
	});
});
$(document).on('click', '.remove-line', function(event){
	event.preventDefault();
	$(this).closest('.order-line').remove();
});
$(document).on('keyup', '#nume', function(){
	var txt = $(this).val();
	if (txt.length >= 2) {
		$.post('ajax/client-list.php', {txt:txt}, function(response){
			if (response.length > 0) {
				$('#client-list').html(response);
			}
		});
	} else {
		$('#client-list').html('');
	}
});
$(document).on('click', '.client-list-item', function(event){
	event.preventDefault();
	var id = $(this).attr('id');
	var nume = $(this).text();
	$('#nume').val(nume);
	$('#client').val(id);
	$('#client-list').html('');
});
$(document).on('submit', '#add-order-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/insert-order.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Comanda a fost salvata!');
			window.location.reload();
		}
	});
});

$(document).on('submit', '#edit-order-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/update-order.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Comanda a fost actualizata!');
			window.location.reload();
		}
	});
});

$(document).on('click', '.delete-order', function(event){
	event.preventDefault();
	var id = $(this).attr('id');
	$.post('ajax/delete-order.php', {id:id}, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Comanda a fost stearsa!');
			window.location.href = 'admin.php?p=comenzi';
		}
	});
});
$(document).on('change', '#tip_comenzi', function () {
    var tip_comenzi = $("#tip_comenzi").val();
	window.location="admin.php?p=comenzi&tip_comenzi="+tip_comenzi;
});

$(document).on('click', '#add-materie-prima', function(event){
	event.preventDefault();
	$('#add-materie-prima-form-wrapper').fadeIn();
});
$(document).on('click', '#close-add-materie-prima-form-wrapper', function(event){
	event.preventDefault();
	$('#add-materie-prima-form-wrapper').fadeOut();
});

$(document).on('submit', '#add-materie-prima-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/add_materie_prima.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Materia prima a fost salvata!');
			window.location.reload();
		}
	});
});

$(document).on('click', '.delete-materie-prima', function(event){
	event.preventDefault();
	var id = $(this).attr('id');
	$.post('ajax/delete-materie-prima.php', {id:id}, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Materia prima a fost stearsa!');
			window.location.href = 'admin.php?p=materii_prime';
		}
	});
});

$(document).on('submit', '#edit-materie-prima-form', function(event){
	event.preventDefault();
	var data = $(this).serialize();
	$.post('ajax/update-materie-prima.php', data, function(response){
		if (response.indexOf('Eroare') >= 0) {
			alert(response);
		} else {
			alert('Materia prima a fost actualizata!');
			window.location.href = 'admin.php?p=materii_prime';
		}
	});
});
$(document).on('click', '#add_materie_prima', function(event){
	event.preventDefault();
	id_mp = $('#materii_prime').val();
	nume_mp = $('#materii_prime option:selected').text();
	unitate_mp = $('#materii_prime option:selected').attr('rel');
	$('#lmp').append("<li value='"+id_mp+"'>"+nume_mp+"<input type='hidden' name='materii_prime[]' value='"+id_mp+"' />" +
		"<input type='text' name='cantitate"+id_mp+"' placeholder='"+unitate_mp+"'><span class='delete-mp'>X</span></li>");
});
$(document).on('click', '.delete-mp', function(event){
	event.preventDefault();
	$(this).parent().remove();
});