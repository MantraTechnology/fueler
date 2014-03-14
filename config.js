/**
 * Created by adron on 3/14/14.
 * Description: Adding configuration for the project.
 */

var convict = require('convict');

// Schema
var conf = convict({
    env: {
        doc: "The applicaton environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    ip: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "IP_ADDRESS"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT"
    }
});

// load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');

// perform validation
conf.validate();

module.exports = conf;