import { useEffect, useState, useRef } from 'react' //ferramenta do React vamos explorar ela para executar coisas SEMPRE ASSIM QUE A PAGINA ABRIR
import './style.css'
import Trash from '../../assets/trash-bin.png'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([]) //usando o UseState HOOK -> estado começa vazio,

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() { // assincrono pois depende de algo que está fora, rodando em portas e locais diferentes
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data) // pegar apenas o que esta dentro de data -> usar o setUsers para ele ficar alterando dinamicamente a informação que está na tela
  }

  async function createUsers() { // assincrono pois depende de algo que está fora, rodando em portas e locais diferentes
    await api.post('/usuarios', { // enviar no mesmo padrao que foi criado na API
      name: inputName.current.value, //caputrar o current value
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    //console.log(inputName)
    getUsers()

  }

  async function deleteUsers(id) { // assincrono pois depende de algo que está fora, rodando em portas e locais diferentes
    await api.delete(`/usuarios/${id}`)
    getUsers()

  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input name='nome' placeholder='Nome' type='text' ref={inputName} />
        <input name='idade' placeholder='Idade' type='number' ref={inputAge} />
        <input name='email' placeholder='Email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade <span>{user.age}</span></p>
            <p>Email <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}


    </div>


  )
}

export default Home
