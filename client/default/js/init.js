/*
JSON is automatically included with each app.

Use the $fh.ready() (http://docs.feedhenry.com/wiki/Ready) function to trigger 
loading the local config and binding a click event to invoke the cloud action 
call which will return the remote config.
*/

var datasetId = 'myDataSet';
var datasetHash ;
$fh.ready(function() {
  sync = $fh.sync;

  sync.init( {"sync_frequency": 5,
          "do_console_log" : true});

  sync.notify(handleSyncNotifications);
  
  sync.manage('myDataSet', {});


  function handleSyncNotifications(notification) {
    console.log("s")
    console.log(notification)

  if ('sync_complete' == notification.code) {
    // We are interested in sync_complete notifications as there may be changes to the dataset
    if (datasetHash != notification.uid) {
      // The dataset hash received in the uid parameter is different to the one 
      // we have stored. This means that there has been a change in the dataset 
      // so we should invoke the list operation.
      datasetHash = notification.uid;
      sync.doList(datasetId, function(res){
        for( key in res){
          console.log(key)
          document.write = key
        }
       
        console.log("res",res)
      }, function(code, msg){
        console.log("error")
        console.log("code", code)
        console.log("msg", msg)
      });
    }
  }
}

});