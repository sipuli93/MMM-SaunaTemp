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
		wrapper.className = "large light";
		var degreeLabel = "°";
		if (this.indoorSensor.temp != NaN) {
			var indoorTemp = document.createElement("SPAN");
			indoorTemp.className = "bright";
			indoorTemp.innerHTML = this.indoorSensor.temp + degreeLabel + "C";
			wrapper.appendChild(indoorTemp);
		}
		if (this.saunaSensor.temp != NaN && this.saunaSensor.temp > this.config.saunaTempLimit) {
			var saunaTemp = document.createElement("SPAN");
			saunaTemp.className = "bright";
			saunaTemp.innerHTML = this.saunaSensor.temp + degreeLabel + "C";
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
				this.indoorSensor.temp = obj.temperature;
				self.updateDom();
			}
			else if (this.saunaSensor.MAC === obj.MAC) {
				this.saunaSensor.temp = obj.temperature;
				self.updateDom();
			}
		}
	},
});
