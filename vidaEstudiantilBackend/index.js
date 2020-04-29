const {Client} = require('pg')

const client= new Client({
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "vidaestudiantil"
})

client.connect()
.then(()=> console.log("Connected HELLO"))
.then(()=>client.query("select * from persona"))
.then (results=>console.table(results.rows))
.catch(e=> console.log(e))
.finally(()=> client.end())


