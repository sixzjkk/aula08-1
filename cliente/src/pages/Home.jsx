import { useEffect, useState } from "react";
import Registrar from "./Registro";
import { jsPDF } from "jsPDF";
import "jspdf-autotable";
import { Button } from '@mui/material';

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])

  const remover = async(id) => {
    try{
      await fetch('http://localhost:3000/usuarios/' + id, {
        method: 'DELETE',
      })
    }
    catch {
      alert('ixii!!!')
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = usuarios.map( usuario => [
      usuario.id,
      usuario.nome,
      usuario.email
    ]);
    doc.text("Lista de Usuários", 10, 10);
    doc.autoTable({
      head: [["Id", "Nome", "Email"]],
      body: tabela
    });

    doc.save("alunos.pdf");
  }

  return (
    <div>
      <button onClick={()=> exportarPDF()}>Gerar PDF</button>
      <table>
        <thead>
          <Button variant="contained" onClick={()
            Gerar PDF
            </Button>
          <tr>
            <td>Nome</td>
            <td>E-mail</td>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) =>
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td><button onClick={() => remover(usuario.id)}>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}