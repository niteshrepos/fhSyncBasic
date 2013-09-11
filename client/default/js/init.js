/*
JSON is automatically included with each app.

Use the $fh.ready() (http://docs.feedhenry.com/wiki/Ready) function to trigger 
loading the local config and binding a click event to invoke the cloud action 
call which will return the remote config.
*/

// -- show category from server
// -- show category if offline
// -- chnage value update local entry

var datasetId = 'myDataSet';
var datasetHash ;
$fh.ready(function() {

document.getElementById('run_button').onclick = function() {
  alert("hello")
    // Invoke a cloud action call to get the remote configuration
    // See: http://docs.feedhenry.com/wiki/Actions
    $fh.act(
      {
        act:'changeDbObj'
      },
      function(res) {
        console.log(res);
      },
      function(code,errorprops,params) {
        console.log(code)
      }
    );
  };


  sync = $fh.sync;

  sync.init( {"sync_frequency": 5,
          "do_console_log" : true});

  sync.notify(handleSyncNotifications);
  
  sync.manage('myDataSet', {});


  function handleSyncNotifications(notification) {
    console.log("s")
    console.log(notification)

  if ('sync_complete' == notification.code) {
    alert("sync complete")
    // We are interested in sync_complete notifications as there may be changes to the dataset
    if (datasetHash != notification.uid) {
      // The dataset hash received in the uid parameter is different to the one 
      // we have stored. This means that there has been a change in the dataset 
      // so we should invoke the list operation.
       
    }
  } else if( 'local_update_applied' === notification.code ) {
      alert("local update applied")
        // Reflect local updates in table immediately
         datasetHash = notification.uid;
      sync.doList(datasetId, function(res){
        $("#list").html("")
        for( key in res){
          $("#list").append("<li>"+key+"</li>")
          console.log(key)
        }
       
        console.log("res",res)
      }, function(code, msg){
        console.log("error")
        console.log("code", code)
        console.log("msg", msg)
      });
    }
}

});