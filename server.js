// Importa o framework Express para criar e gerenciar o servidor web
import express from "express"
import routes from "./src/routes/postsRoutes.js"

// Função para buscar o índice de um post no array de posts pelo ID
function buscaPostPorId(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

// Cria uma instância do aplicativo Express
const app = express()
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem de confirmação no console
app.listen(3000, () => {
    console.log("Servidor ok")
})

