var util = require('util');
var dbObject = {
  		"apps":"Applications",
		"cms":"Consultancy & Management Services",
		"dc":"Data & Connectivity",
		"vuc":"Voice & Unified Communications",
		"infra":"Infrastructure"
  	}

  	exports.changeDbObj = function(params, callback) {
  		dbObject.newVal =  "some new value";
  		console.log("dbon server", dbObject)
  		return callback(null, dbObject)
  	}
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

/* 'getConfig' server side REST API method.
 * Trivial example of pulling in a shared config file.
 */
exports.getConfig = function(params, callback) {
  console.log("In getConfig() call");
  var cfg = require("config.js");
  return callback(null, {config: cfg.config});
};

var sync = $fh.sync;
var dataset_id = "myDataSet";

exports.myDataSet = function(params, callback) {
  $fh.sync.invoke('myDataSet', params, callback);
}

sync.init("myDataSet", {}, function() {
  sync.handleList(dataset_id, function(dataset_id, params, cb){
  	return cb(null, dbObject)
  });

  // sync.handleCreate(dataset_id, dataHandler.doCreate);
  // sync.handleRead(dataset_id, dataHandler.doRead);
  // sync.handleUpdate(dataset_id, dataHandler.doUpdate);
  // sync.handleDelete(dataset_id, dataHandler.doDelete);
  // sync.handleCollision(dataset_id, dataHandler.doCollision);
  // sync.listCollisions(dataset_id, dataHandler.listCollisions);
  // sync.removeCollision(dataset_id, dataHandler.removeCollision);
});