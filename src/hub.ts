var Hub  = require('cluster-hub');
var hub = new Hub();
var cluster = require('cluster');

if (cluster.isMaster) {
    var worker = cluster.fork();

    hub.on('master-to-master', function (data) {
        console.log('master-to-master received');
    });
    hub.on('worker-to-master', function (data) {
        console.log('worker-to-master received');
    });

    hub.sendToMaster('master-to-master', 1);
    hub.sendToWorker(worker, 'master-to-worker', 'dick');
} else {
    hub.on('master-to-worker', function (data) {
        console.log('master-to-worker received' + data);;
        process.exit();
    });

    hub.sendToMaster('worker-to-master', 2);
}