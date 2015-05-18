var connectMapService;

function ConnectMapService($, settings, mid) {
	var moduleId = mid;
	var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Map');

	this.ajaxCall = function (type, controller, action, id, data, success, fail) {
		$.ajax({
			type: type,
			url: baseServicepath + controller + '/' + action + (id != null ? '/' + id : ''),
			beforeSend: $.dnnSF(moduleId).setModuleHeaders,
			data: data
		}).done(function (retdata) {
			if (success != undefined) {
				success(retdata);
			}
		}).fail(function (xhr, status) {
			if (fail != undefined) {
				fail(xhr.responseText);
			}
		});
	}

	this.getDataPoints = function (success) {
		this.ajaxCall('GET', 'MapPoints', 'List', null, null, success);
	}

}
