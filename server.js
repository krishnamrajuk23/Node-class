import { sum } from './math';

const str = "Hello everyone";
console.log(str);


// import methods from other files
console.log(sum(10, 20));


//File System
const fs = require('fs');


/******** Sync - Blocking Operation - Start ********/
fs.writeFileSync('address.txt', "Hyd, india");

fs.writeFileSync('contact.txt', "harshita, 999999999");

const contactInfo = fs.readFileSync("./contact.txt", "utf-8");
console.log(contactInfo)
/******** Sync - Blocking Operation - End ********/



/******** Sync - Blocking Operation ********/
fs.writeFile('text.txt', "Hello everyone", (err)=> {})

fs.readFile("./contact.txt", "utf-8", (err,result) => {
    console.log(result)
 })
/******** Sync - Blocking Operation ********/

/*** Identifying the Number of cpus core are available - it help to identify no of threads are available****/
const os = require("os");
console.log(os.cpus().length);
