import { useEffect, useRef, useState } from 'react';
import './style.css';
import Trash from '../assets/lixo.svg';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]) // muda o estado da variável

  // pegando o valor dos input usando 'ref'
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // Função que pega usuário do banco de dados
  async function getUsers(){
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }

  // Função que cria novo usuário
  async function createUsers(){

    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  // Função que deleta um usuário
  async function deleteUsers(id){
    await api.delete(`/users/${id}`)

    getUsers()
  }

  // chama a função assim que inicia o site
  useEffect(() => {
    getUsers()
  }, );
 
  // HTML
  return (
    // Container Principal
    <div className='container'>

      {/* Formulario de cadastro */}
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="nome" name='nome' type='text' ref={inputName}></input>
        <input placeholder="idade" name='idade' type='number' ref={inputAge}></input>
        <input placeholder="email" name='email' type='email' ref={inputEmail}></input>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {/*Usando JavaScript para percorrer todos usuários e chamar função */}
      {users.map((user) => (
        // Mostruário de cadastros
        <div key={user.id} className='card'>

          {/* Cadastro */}
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} height=" 30 px"/>
          </button>

        </div>
      ))}

    </div>
  );
};

export default Home;