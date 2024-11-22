// Importa o módulo fs (File System) para manipulação de arquivos
import fs from "fs"

// Importa as funções `getAllPosts` e `criarPost` do modelo de posts
import { getAllPosts, criarPost } from "../models/postsModel.js"

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Obtém todos os posts do banco de dados
    const posts = await getAllPosts()
    // Responde com um status 200 e os posts em formato JSON
    res.status(200).json(posts)
}

// Função para criar um novo post
export async function postarNewPost(req, res) {
    // Recebe os dados do novo post a partir do corpo da requisição
    const novoPost = req.body

    try {
        // Cria o novo post no banco de dados
        const postCriado = await criarPost(novoPost)
        // Responde com um status 200 e o post recém-criado
        res.status(200).json(postCriado)
    } catch (erro) {
        // Exibe o erro no console em caso de falha
        console.error("Erro! ", erro.message)
        // Responde com um status 500 e uma mensagem de erro
        res.status(500).json({ "Erro": "Falha da requisição" })
    }
}

// Função para fazer upload de uma imagem associada a um novo post
export async function uploadImg(req, res) {
    // Cria um novo objeto para o post com informações mínimas
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Obtém o nome original do arquivo enviado
        alt: "" // Campo de texto alternativo vazio
    }

    try {
        // Cria o novo post no banco de dados
        const postCriado = await criarPost(novoPost)

        // Define o caminho atualizado do arquivo com base no ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`

        // Renomeia/move o arquivo para o caminho atualizado
        fs.renameSync(req.file.path, imagemAtualizada)

        // Responde com um status 200 e o post recém-criado
        res.status(200).json(postCriado)
    } catch (erro) {
        // Exibe o erro no console em caso de falha
        console.error(erro.message)
        // Responde com um status 500 e uma mensagem de erro
        res.status(500).json({ "Erro": "Falha na requisição" })
    }
}
