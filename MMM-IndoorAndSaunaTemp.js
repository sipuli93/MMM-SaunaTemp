/* global Module */

/* Magic Mirror
 * Module: MMM-IndoorAndSaunaTemp
 *
 * By 
 * MIT Licensed.
 */

Module.register("MMM-IndoorAndSaunaTemp", {
	defaults: {	
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
	},
	
	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		return wrapper;
	},
	
	// Load css files
	getStyles: function () {
		return [
			"MMM-IndoorAndSaunaTemp.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},
});
