// Importa o framework Express para criar e gerenciar o servidor web
import express from "express"

// Importa o pacote Multer para manipular uploads de arquivos
import multer from "multer"

// Importa os controladores das funções relacionadas aos posts
import { listarPosts, postarNewPost, uploadImg } from "../controllers/postsController.js"

// Configura o armazenamento para os arquivos de upload
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão armazenados
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    // Define o nome do arquivo no destino (mantém o nome original do arquivo)
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// Cria uma instância de Multer com o diretório de destino e a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage })

// Define as rotas do aplicativo Express
const routes = (app) => {
    // Configura o Express para interpretar requisições no formato JSON
    app.use(express.json())

    // Define uma rota GET para "/posts" que chama o controlador `listarPosts` e retorna todos os posts do banco de dados
    app.get("/posts", listarPosts)

    // Define uma rota POST para "/posts" que chama o controlador `postarNewPost` e cria um novo post
    app.post("/posts", postarNewPost)

    // Define uma rota POST para "/upload" que processa um upload de arquivo usando Multer e chama o controlador `uploadImg`
    app.post("/upload", upload.single("imagem"), uploadImg)
}

// Exporta as rotas para serem usadas em outros arquivos
export default routes
