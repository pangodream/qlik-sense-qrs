## Qlik Sense QRS API - Node.js

Qlik Sense QRS API wrapper for Node.js

### Installation
```
npm install qlik-sense-qrs --save
```

### Configuration

```JS
const qsqrs = require('qlik-sense-qrs');

//Set an array of options
let options = {
    host: 'https://yourserver:4242/qrs',
    //Path to your server certificates
    certFile: '../../qlik/client.pem',
    certKeyFile: '../../qlik/client_key.pem'
};


//Apply defined configuration
qsqrs.config.apply(options);

console.clear();
//Show the current configuration
console.log(qsqrs.config.getConfiguration());
```
### Some use examples 
```JS
//Executes a task by its name and checks execution status (just code)
(async() => {
    try {
        let name = 'My Task A01';
        let data = await qsqrs.entities.task.list(`name eq '${name}'`);
        let id = data[0].id;
        data = await qsqrs.entities.task.start(id);
        await qsqrs.util.wait(5000);
        data = await qsqrs.entities.task.list(`id eq ${id}`);
        let execData = data[0].operational.lastExecutionResult;
        console.log(`\tStatus:\t${execData.status}\n\tStart:\t${execData.startTime}\n\tStop:\t${execData.stopTime}`);
    } catch (err) {
        console.log(err);
    }
})();

//Executes a task by its name and checks execution status (Console comments)
(async() => {
    try {
        let name = 'My Task A01';
        console.log('Retrieve task data by name');
        let data = await qsqrs.entities.task.list(`name eq '${name}'`);
        let id = data[0].id;
        console.log(`Task id is ${id}\nStart task specifying its id`);
        data = await qsqrs.entities.task.start(id);
        console.log('Task started. Wait for 5 seconds....');
        await qsqrs.util.wait(5000);
        console.log('Retrieve task data by id');
        data = await qsqrs.entities.task.list(`id eq ${id}`);
        console.log('Show execution / progress result');
        let execData = data[0].operational.lastExecutionResult;
        console.log(`\tStatus:\t${execData.status}\n\tStart:\t${execData.startTime}\n\tStop:\t${execData.stopTime}`);
    } catch (err) {
        console.log(err);
    }
})();



//List all of the apps
(async() => {
    try {
        let data = await qsqrs.entities.app.list();
        data.forEach(app => {
            console.log(`${app.id}: ${app.name}`);
        });
    } catch (err) {
        console.log(err);
    }
})();

//Get a list of tasks
(async() => {
    try {
        let data = await qsqrs.entities.task.list();
        data.forEach(task => {
            console.log(`${task.id}: ${task.name} - ${task.operational.lastExecutionResult.startTime}`);
        });
    } catch (err) {
        console.log(err);
    }
})();

//Retrieve data of user with id 16c2e5e3-7ee... using the user entity
(async() => {
    try {
        let data = await qsqrs.entities.user.list('id eq 16c2e5e3-7eef-4b27-9d46-9495d05b0d38');
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})();

//Retrieve data of task with id 649ebe2e-f58... using the genericEntity 
(async() => {
    try {
        let data = await qsqrs.entities.genericEntity.list('task', 'id eq 649ebe2e-f582-49ee-8976-d08b43b5fd89');
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})();
```