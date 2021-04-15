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
                initialLoadDelay: 1000,
                retryDelay: 10 * 1000, //10sec
                updateInterval: 60 * 1000, //1min
                animationSpeed: 400
        },

        requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
                Log.info("Starting module: " + this.name);
                this.sensor = {
			mac: this.config.sensorMac
			temperature: NaN,
			humidity: NaN,
			header: this.config.sensorHeader
		};
                this.queryURL = this.config.ruuvitagRestGatewayAddr + "/ruuvitag/" + this.sensor.mac;
                this.scheduleUpdate(this.config.initialLoadDelay);
	},

	// Generate dom object for module
	getDom: function() {
		var self = this;
		var wrapper = document.createElement("DIV");
		wrapper.className = "large light";
		var degreeLabel = "°";
		if (this.sensor.temp != NaN && this.sensor.temperature > this.config.tempLimit) {
                        var saunaHeader = document.createElement("HEADER");
			var saunaTempSpan = document.createElement("SPAN");
                        var saunaHeaderText = document.createTextNode(this.sensor.header);
			var saunaTemp = document.createTextNode(this.roundValue(this.sensor.temperature) + degreeLabel + "C");
			if (this.sensor.temp > this.config.readyLimit){
				saunaTempSpan.className = "bright regular blinking";
			} else {
				saunaTempSpan.className = "bright regular";
			}
			saunaTempSpan.appendChild(saunaTemp);
			saunaHeader.appendChild(saunaHeaderText);
			wrapper.appendChild(saunaHeader);
			wrapper.appendChild(saunaTempSpan);
		}
		return wrapper;
	},

	// Load css files
	getStyles: function () {
		return [
			"MMM-SaunaTemp.css",
		];
	},

        // Update sensor data from rest gateway
        updateSensors: function () {
                var self = this;
                var retry = true;
                
                if (this.config.endpoint === "") {
                        Log.error(self.name + ": Missing endpoint!");
                        return;
                }
                var dataRequest = new XMLHttpRequest();
                dataRequest.open("GET", this.queryURL, true);
                dataRequest.onreadystatechange = function () {
                        if (this.readyState === 4) {
                                if (this.status === 200) {
                                        self.processSensorData(JSON.parse(this.response));
                                } else {
                                        Log.error(self.name + ": Could not load sensor data.");
                                }

                                if (retry) {
                                        self.scheduleUpdate(self.loaded ? -1 : self.config.retryDelay);
                                }
                        }
                };
                dataRequest.send();
        },

        // Handle received data and update dom
        processSensorData: function (data) {
                this.sensor.temperature = data.ruuvitags[i].temperature;
                this.sensor.humidity = data.ruuvitags[i].humidity;
                this.loaded = true;
                this.updateDom(this.config.animationSpeed);
        },

        // Schedule next update
        scheduleUpdate: function (delay) {
                var nextLoad = this.config.updateInterval;
                if (typeof delay !== "undefined" && delay >= 0) {
                        nextLoad = delay;
                }

                var self = this;
                setTimeout(function () {
                        self.updateSensors();
                }, nextLoad);
        },

        // Round temperature
        roundValue: function (temperature) {
                var decimals = this.config.roundTemp ? 0 : 1;
                var roundValue = parseFloat(temperature).toFixed(decimals);
                return roundValue === "-0" ? 0 : roundValue;
        }
});
