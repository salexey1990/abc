var Hub  = require('cluster-hub');
var hub = new Hub();

hub.on('master-to-worker', function (data) {
    console.log(data);;
    // process.exit();
});

// hub.sendToMaster('worker-to-master', 2);