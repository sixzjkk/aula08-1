import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate();

  const registrar = async(event) => {
    event.preventDefault();
    try{
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      })
      if (resposta.ok){
        navigation('/');
      }
    } catch (error) {
      alert('Ocorreu um erro na aplicação :(');
    }
  }

  return (
        <main>
            <form onSubmit={registrar}>
              <input value={nome} type="text" onChange={(event) => setNome(event.target.value)}/> <br/>
              <input value={email} type="email" onChange={(event) => setEmail(event.target.value)}/> <br/>
              <button>Registrar</button>
            </form>
        </main>
  );
}