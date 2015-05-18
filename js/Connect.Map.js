var connectMapService;

function ConnectMapService($, settings, mid) {
	var moduleId = mid;
	var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Map');

	this.ajaxCall = function (type, controller, action, id, data, success, fail) {
		showLoading();
		$.ajax({
			type: type,
			url: baseServicepath + controller + '/' + action + (id != null ? '/' + id : ''),
			beforeSend: $.dnnSF(moduleId).setModuleHeaders,
			data: data
		}).done(function (retdata) {
			hideLoading();
			if (success != undefined) {
				success(retdata);
			}
		}).fail(function (xhr, status) {
			showError(xhr.responseText);
			if (fail != undefined) {
				fail(xhr.responseText);
			}
		});
	}

	this.getDataPoints = function (success) {
		this.ajaxCall('GET', 'MapPoints', 'List', null, null, success);
	}
	this.addPoint = function (lat, lng, msg, success) {
		this.ajaxCall('POST', 'MapPoints', 'Add', null, { Latitude: lat, Longitude: lng, Message: msg }, success);
	}
}

function showLoading() {
	if ($('#mapStatus').length) {
		$('#mapStatus div:first-child').show();
		$('#mapStatus div:nth-child(2)').hide();
		$('#mapStatus').css('background', '#2FC1F3').show();
	}
}

function hideLoading() {
	if ($('#mapStatus').length) {
		$('#mapStatus').hide();
	}
}

function showError(message) {
	if ($('#mapStatus').length) {
		$('#mapStatus div:first-child').hide();
		$('#mapStatus div:nth-child(2)').html(message).show();
		$('#mapStatus').css('background', '#F33B2F').show();
		setTimeout(function () { $('#cmStatus').hide(); }, 3000);
	}
}
