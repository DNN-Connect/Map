var connectMapService;

function ConnectMapService($, settings, mid) {
	var moduleId = mid;
	var baseServicepath = $.dnnSF(moduleId).getServiceRoot('Connect/Map');

	this.getDataPoints = function (success, fail) {
		$.ajax({
			type: 'GET',
			url: baseServicepath + 'MapPoints/List',
			beforeSend: $.dnnSF(moduleId).setModuleHeaders
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
}
