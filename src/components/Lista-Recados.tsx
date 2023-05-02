import React, { useState, useEffect } from "react";
import User from "../types/User";
import { useNavigate } from "react-router-dom";



const List: React.FC = () => {

  const props = {
    logged: {} as User,
    allUsers: [] as User[],
    onLogout: () => {},
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(!props.logged){
      navigate('/');
    }
  }, [props.logged, navigate]);

  function addErrand() {
    if (!props.logged) {
      return;
    }
  
    const newErrand = {
      title,
      description
    };
  
    if (!props.logged.errands) {
      props.logged.errands = [];
    }
  
    props.logged.errands.push(newErrand);
  
    setTitle('');
    setDescription('');
    saveData();
    renderTable();
  }
  

  function deleteErrand(index: number) {
    props.logged.errands.splice(index, 1);
    saveData();
    renderTable();
  }

  function editErrand(index: number) {
    const newTitle = prompt("Informe o novo título: ");

    if (newTitle !== null) {
      props.logged.errands[index].title = newTitle;
    }

    const newDescription = prompt("Informe a nova descrição: ");

    if (newDescription !== null) {
      props.logged.errands[index].description = newDescription;
    }

    saveData();
    renderTable();
  }

  function saveData() {
    sessionStorage.setItem("logged", JSON.stringify(props.logged));

    const findUser = props.allUsers.findIndex((user) => user.email === props.logged.email);

    props.allUsers[findUser] = props.logged;

    localStorage.setItem("allUsers", JSON.stringify(props.allUsers));
  }

  const renderTable = () => {
    return (
      <div>
        <h1>Tabela de Tarefas</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.logged.errands.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.title}</td>
                <td>{value.description}</td>
                <td>
                  <button className="botao-apagar" onClick={() => deleteErrand(index)}>
                    Apagar
                  </button>
                  <button className="botao-editar" onClick={() => editErrand(index)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        
      </div>
    );

  }
return (
  <>
    <div>
    <button onClick={() => props.onLogout()}>Logout</button>
  </div>
  <div>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
             
    <button onClick={() => addErrand()}>Adicionar</button>
              
    </div>
  </>
  
)
  
};

export default List;
