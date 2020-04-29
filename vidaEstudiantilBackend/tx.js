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
        await client.query("BEGIN")
        await client.query("insert into persona (contrasena, horas_beca, carrera, correo, carne, genero, nombre, facultad, apellido) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", ['contrasenaMerlin', null, null, 'merlin@uvg.edu.gt',null, 'F', 'Merlín',null,  'Espina'])
        await client.query("COMMIT")
       
    }
    catch (ex){
        console.log(`Algo malo paso ${ex}`)
        await client.query("ROLLBACK")
    }
    finally{
        await client.end()
        console.log("Desconectado")
    }

}