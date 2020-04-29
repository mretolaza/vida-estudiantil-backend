const {Client}=require('pg')

const client= new Client({
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "vidaestudiantil"
})

execute()

async function execute(){
    try{
        await client.connect()
        console.log("Connected ")
        const {rows}= await client.query("select * from persona")
        console.table(rows)
       
    }
    catch (ex){
        console.log(`Algo malo paso ${ex}`)
    }
    finally{
        await client.end()
        console.log("Desconectado")
    }

}