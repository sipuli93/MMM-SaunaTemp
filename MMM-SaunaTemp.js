/* Magic Mirror
 * Module: MMM-SaunaTemp
 *
 * By sipuli93
 * MIT Licensed.
 */

Module.register("MMM-SaunaTemp", {
	defaults: {
		tempLimit: 35,
		readyLimit: 60,
		sensorHeader: "Sauna",
		initialDelay: 10,
		refreshDelay: 60
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		this.Sensor = {
			endpoint: this.config.endpoint,
			temp: NaN,
			humidity: NaN,
			header: this.config.sensorHeader
		};
	},
	
	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("DIV");
		wrapper.className = "large light sidebyside";
		var degreeLabel = "°";
		if (this.sensor.temp != NaN && this.sensor.temp > this.config.tempLimit) {
			var saunaWrapper = document.createElement("DIV");
                        var saunaHeader = document.createElement("HEADER");
			var saunaTempSpan = document.createElement("SPAN");
                        var saunaHeaderText = document.createTextNode(this.sensor.header);
			var saunaTemp = document.createTextNode(this.sensor.temp.toFixed(1) + degreeLabel + "C");
			if (this.sensor.temp > this.config.readyLimit){
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
