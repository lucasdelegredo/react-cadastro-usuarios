import axios from 'axios'

//criar a conexao
const api = axios.create({
    baseURL: 'http://localhost:3000' //endereço que esta o BACKEND
})

export default api