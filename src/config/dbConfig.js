import { MongoClient } from "mongodb"

export default async function conectarBD(stringConexao) {
    let mongoClient

    try {
        mongoClient = new MongoClient(stringConexao)
        await mongoClient.connect()
        console.log("Conexão realizada!")
        return mongoClient
    } catch (erro) {
        console.error("Falha na conexão com o banco :( ", erro)
        process.exit()
    }
}