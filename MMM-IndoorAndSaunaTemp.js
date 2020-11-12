/* global Module */

/* Magic Mirror
 * Module: MMM-IndoorAndSaunaTemp
 *
 * By sipuli93
 * MIT Licensed.
 */

Module.register("MMM-IndoorAndSaunaTemp", {
	defaults: {
		saunaTempLimit: 35
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		this.indoorSensor = {
			MAC: this.config.indoorSensorMAC,
			temp: NaN
		};
		this.saunaSensor = {
			MAC: this.config.saunaSensorMAC,
			temp: NaN
		};
	},
	
	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		var degreeLabel = "°";
		if (this.indoorSensor.temp != NaN) {
			var indoorTemp = document.createElement("H1");
			indoorTemp.innerHTML = this.indoorSensor.temp + degreeLabel + " C";
			wrapper.appendChild(indoorTemp);
		}
		if (this.saunaSensor.temp != NaN && this.saunaSensor.temp > this.config.saunaTempLimit) {
			var saunaTemp = document.createElement("H1");
			saunaTemp.innerHTML = this.saunaSensor.temp + degreeLabel + " C";
			wrapper.appendChild(saunaTemp);
		}
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
	
	// Override socket notification handler.
	notificationReceived: function (notification, payload, sender) {
		var self = this;
		
		if (notification == 'RUUVI_ENVIRONMENT_PACKET') {
			var obj = JSON.parse(payload);
			
			if (this.indoorSensor.MAC === obj.MAC) {
				this.indoorSensorTemp = obj.temperature;
				self.updateDom();
			}
			else if (this.saunaSensor.MAC === obj.MAC) {
				this.saunaSensorTemp = obj.temperature;
				self.updateDom();
			}
		}
	},
});
