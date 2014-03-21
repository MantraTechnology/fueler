/**
 * Created by adron on 3/14/14.
 * Description: Adding configuration for the project.
 */

var convict = require('convict');

// Schema
var conf = convict({
    env: {
        doc: "The App Environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT"
    },
    database: {
        host: {
            default: "someplace:cool",
            env: "DB_HOST"
        }
    }
});

// load environment dependent configuration
var env = conf.get('env');
conf.loadFile('./config/test.json');

// perform validation
conf.validate();

module.exports = conf;