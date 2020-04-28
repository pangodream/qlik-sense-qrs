const qst = require('../src/qst');

let options = {
    host: 'https://qlik.intrayell.com:4242/qrs',
    certFile: '../../qlik/client.pem',
    certKeyFile: '../../qlik/client_key.pem'
};

//try {
let instance = qst.configure(options);

console.log(instance.getConfiguration());

instance.listApps().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});