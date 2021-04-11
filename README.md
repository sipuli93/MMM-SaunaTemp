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
                Endpoint: "<URL to rest api>"
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `endpoint`        | *Required* Full url pointing to sensor in rest api. Example `http://<ip>:<port>/ruuvitag/<macaddress>`
| `tempLimit`        | *Optional* The minimum to show sauna temperature <br>**Type:** `int`(celsius) <br>Default 35 celsius
| `readyLimit`        | *Optional* The minimum when sauna temperature will start blinking <br>**Type:** `int`(celsius) <br>Default 60 celsius
| `sensorHeader`        | *Optional* Header for sauna <br>Default `sauna`
