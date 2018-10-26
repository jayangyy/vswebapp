(function($){
	if ($.fn.menu){
		$.extend($.fn.menu.defaults, {
			itemHeight: 22
		});
	}
	if ($.fn.tabs){
		$.extend($.fn.tabs.defaults, {
			tabHeight: 27
		});
	}
	if ($.fn.datagrid){
		$.extend($.fn.datagrid.defaults, {
			editorHeight: 24
		});
	}
	if ($.fn.treegrid){
		$.extend($.fn.treegrid.defaults, {
			editorHeight: 24
		});
	}
	$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
			'combo','combobox','combogrid','combotree',
			'datebox','datetimebox','numberbox',
			'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
		if ($.fn[plugin]){
			$.fn[plugin].defaults.iconWidth = 18;
		}
	});
})(jQuery);
