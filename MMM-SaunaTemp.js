/* Magic Mirror
 * Module: MMM-SaunaTemp
 *
 * By sipuli93
 * MIT Licensed.
 */

Module.register("MMM-SaunaTemp", {
	defaults: {
		TempLimit: 35,
		ReadyLimit: 60,
		SensorHeader: "Sauna",
		InitialDelay: 10,
		RefreshDelay: 60
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		this.Sensor = {
			endpoint: this.config.Endpoint,
			temp: NaN,
			humidity: NaN,
			header: this.config.SensorHeader
		};
	},
	
	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("DIV");
		wrapper.className = "large light sidebyside";
		var degreeLabel = "°";
		if (this.Sensor.temp != NaN && this.Sensor.temp > this.config.TempLimit) {
			var saunaWrapper = document.createElement("DIV");
                        var saunaHeader = document.createElement("HEADER");
			var saunaTempSpan = document.createElement("SPAN");
                        var saunaHeaderText = document.createTextNode(this.Sensor.header);
			var saunaTemp = document.createTextNode(this.Sensor.temp.toFixed(1) + degreeLabel + "C");
			if (this.Sensor.temp > this.config.ReadyLimit){
				saunaTempSpan.className = "bright regular blinking";
			} else {
				saunaTempSpan.className = "bright regular";
			}
			saunaTempSpan.appendChild(saunaTemp);
			saunaHeader.appendChild(saunaHeaderText);
			saunaWrapper.appendChild(saunaHeader);
			saunaWrapper.appendChild(saunaTempSpan);
			wrapper.appendChild(saunaWrapper);
		}
		return wrapper;
	},
	
	// Load css files
	getStyles: function () {
		return [
			"MMM-SaunaTemp.css",
		];
	},
	
	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		var self = this;
		}
	},
});
