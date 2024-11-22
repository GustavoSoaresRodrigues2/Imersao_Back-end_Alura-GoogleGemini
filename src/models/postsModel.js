// Importa a função de configuração do banco de dados
import conectarBD from '../config/dbConfig.js'

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarBD(process.env.STRING_CONEXAO)

// Função para buscar todos os posts da coleção "posts" no banco de dados
export async function getAllPosts() {
    const db = conexao.db("imersao-alura-back-end") // Acessa o banco de dados
    const colecao = db.collection("posts") // Acessa a coleção "posts"
    return colecao.find().toArray() // Retorna todos os documentos como array
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-alura-back-end") // Acessa o banco de dados
    const colecao = db.collection("posts") // Acessa a coleção "posts"
    return colecao.insertOne(novoPost) // Insere o objeto `novoPost` na coleção "posts" e retorna o resultado da operação
}
