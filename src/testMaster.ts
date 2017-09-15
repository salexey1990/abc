var cluster = require('cluster');
var Hub  = require('cluster-hub');
var fs = require('fs');
var hub = new Hub();
var _ = require('lodash');

var CPUCount = require("os").cpus().length;
const workers = []

for (var i = 0; i < CPUCount; ++i) {
    const worker = cluster.fork();
    workers.push(worker);
}

var stream = fs.createReadStream('../grt-nginx.access', { encoding : 'utf8' });
stream.on("readable", () => processData(stream.read()));
stream.on("end", done);

hub.on('worker-to-master', function (data) {
    console.log('worker-to-master received');
});
function processData(chank) {
    const worker = _.sample(workers);
    hub.sendToWorker(worker, 'master-to-worker', chank);
}
// workers.forEach(worker => {
//     hub.sendToWorker(worker, 'master-to-worker', 'dick');
// });
