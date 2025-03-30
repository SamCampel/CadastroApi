import { useEffect, useRef, useState } from 'react';
import './style.css';
import Trash from '../assets/lixo.svg';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {

    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }

async function createUsers() {
  if (!inputName.current.value || !inputAge.current.value || !inputEmail.current.value) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });
    
    console.log("Usuário criado:", response.data);
    getUsers();
    
    // Limpa os campos após cadastro
    inputName.current.value = '';
    inputAge.current.value = '';
    inputEmail.current.value = '';
    
  } catch (error) {
    console.error("Erro completo:", error);
    console.error("Resposta do servidor:", error.response?.data);
    alert(`Erro ao criar usuário: ${error.response?.data?.error || error.message}`);
  }
}

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className='container'>

      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="nome" name='nome' type='text' ref={inputName}></input>
        <input placeholder="idade" name='idade' type='number' ref={inputAge}></input>
        <input placeholder="email" name='email' type='email' ref={inputEmail}></input>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>

          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} height=" 30 px" />
          </button>

        </div>
      ))}

    </div>
  );
};

export default Home;