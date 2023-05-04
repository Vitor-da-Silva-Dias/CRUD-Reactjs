import React, { useState, useEffect } from "react";
import User from "../types/User";
import { useNavigate } from "react-router-dom";



const List: React.FC = () => {

  const [logged, setLogged] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionLogged = sessionStorage.getItem("logged");
    if (sessionLogged) {
      setLogged(JSON.parse(sessionLogged));
    } else {
      navigate("/");
    }
  }, [navigate]);

  function addErrand() {
    if (!logged) {
      return;
    }
  
    const newErrand = {
      title,
      description
    };
    
    const updatedUser = {
      ...logged,
      errands: [...logged.errands, newErrand],
    };

    logged.errands.push(newErrand);
    
    setLogged(updatedUser);
    saveData(updatedUser);
    setTitle("");
    setDescription("");
  }
    

  function deleteErrand(index: number) {
    if (!logged) return;

    const updatedUser = {
      ...logged,
      errands: logged.errands.filter((_, i) => i !== index),
    };

    logged.errands.splice(index, 1);

    setLogged(updatedUser);
    saveData(updatedUser);
  }
  

  function editErrand(index: number) {
    if (!logged) return;
    
    const newTitle: string= prompt("Informe o novo título: ") ?? '';

    const newDescription: string = prompt("Informe a nova descrição:") ?? '';
    
    const updatedUser = {
      ...logged,
      errands: logged.errands.map((errand, i) =>
        i === index ? { title: newTitle, description: newDescription } : errand
      ),
    };

    logged.errands[index].title = newTitle;

    logged.errands[index].description = newDescription;

    setLogged(updatedUser);
    saveData(updatedUser);
  }

  function saveData(user: User) {
    
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    const findUser = allUsers.findIndex((u: User) => u.email === user.email);
    

    if (findUser !== -1) {
      allUsers[findUser] = user;
    } else {
      allUsers.push(user);
    }

    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    
    sessionStorage.setItem('logged', JSON.stringify(logged));
 

  }

  function logout () {
    sessionStorage.removeItem('logged');

    navigate('/');
  }

  return (
  <>
    <div>
      <button onClick={logout}>Sair</button>
    </div>
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        addErrand();
      }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Descrição"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhamento"
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  <div>
  <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Detalhamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {logged?.errands.map((errand, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{errand.title}</td>
              <td>{errand.description}</td>
              <td>
                <button onClick={() => deleteErrand(index)}>Apagar</button>
                <button onClick={() => editErrand(index)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  </>
      
    )
}

export default List;
