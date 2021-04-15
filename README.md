# MMM-SaunaTemp

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Module takes sensor data via http from [RuuvitagRestGateway](https://github.com/sipuli93/RuuvitagRestGateway)

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
             module: "MMM-SaunaTemp",
             position: "bottom_center",
             config: {
                ruuvitagRestGatewayAddr: "http://<ip>:<port>",
		sensorMac: "<sensor mac>"
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `ruuvitagRestGatewayAddr`        | *Required* url pointing to ruuvitagRestGateway
| `sensorMac`        | *Required* Mac address of the sensor. Lowercase, only letters and numbers. Example "0a1b2c3d4e5f".
| `tempLimit`        | *Optional* The minimum to show sauna temperature <br>**Type:** `int`(celsius) <br>Default 35 celsius
| `readyLimit`        | *Optional* The minimum when sauna temperature will start blinking <br>**Type:** `int`(celsius) <br>Default 60 celsius
| `sensorHeader`        | *Optional* Header for sauna <br>Default `sauna`
