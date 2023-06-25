import React, { useState, useEffect } from "react";
import User from "../types/User";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Archive';

const List: React.FC = () => {
  const [logged, setLogged] = useState<User | null>(null);
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [filterDescription, setFilterDescription] = useState("");
  const [filterArchived, setFilterArchived] = useState("");
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
      description,
      detail,
    };
  
    fetch(`http://localhost:3333/users/${logged.id}/errands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newErrand),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          
          const updatedUser = {
            ...logged,
            errands: [...logged.errands, data.data],
          };
          setLogged(updatedUser);
          saveData(updatedUser);
          setDescription("");
          setDetail("");
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  function deleteErrand(id: string | undefined) {
    if (!logged) return;

    const confirm = window.confirm("Are you sure?");

    if(confirm){
    fetch(`http://localhost:3333/users/${logged.id}/errands/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          const updatedUser = {
            ...logged,
            errands: logged.errands.filter((errand) => errand.id !== id),
          };
          setLogged(updatedUser);
          saveData(updatedUser);
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  }

  function editErrand(id: string | undefined) {
    if (!logged) return;
  
    let newDescription = logged.errands.find((errand) => errand.id === id)?.description || "";
  
    const editDescription = window.confirm("Editar o título?");
  
    if (editDescription) {
      newDescription = prompt("Informe o novo título") ?? "";
    }
  
    let newDetail = logged.errands.find((errand) => errand.id === id)?.detail || "";
  
    const editDetail = window.confirm("Editar a descrição");
  
    if (editDetail) {
      newDetail = prompt("Informe a nova descrição:") ?? "";
    }
  
    fetch(`http://localhost:3333/users/${logged.id}/errands/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newDescription, detail: newDetail }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          const updatedUser = {
            ...logged,
            errands: logged.errands.map((errand) =>
              errand.id === id ? { ...errand, description: newDescription, detail: newDetail } : errand
            ),
          };
          setLogged(updatedUser);
          saveData(updatedUser);
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function archiveErrand(id: string| undefined) {
    if (!logged) return;

    fetch(`http://localhost:3333/users/${logged.id}/errands/${id}/archive`, {
      method: 'POST',
    })
      .then((response) => response.json()) 
      .then((data) => {
        if (data.ok) {
          const updatedErrands = logged.errands.map((errand) => {
            if (errand.id === id) {
              return { ...errand, archived: true };
            }
            return errand;
          });
        
          const updatedUser = { ...logged, errands: updatedErrands };
          setLogged(updatedUser);
          saveData(updatedUser);
        } else {
          console.error('Erro ao arquivar recado');
          alert('Erro ao arquivar recado');
        }
      })
      .catch(error => {
        console.error('Erro ao arquivar recado', error);
        alert('Erro ao arquivar recado');
      });
  }
  
  function unarchiveErrand(id: string | undefined) {
    if (!logged) return;
  
    fetch(`http://localhost:3333/users/${logged.id}/errands/${id}/unarchive`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          const updatedErrands = logged.errands.map((errand) => {
            if (errand.id === id) {
              return { ...errand, archived: false };
            }
            return errand;
          });
        
          const updatedUser = { ...logged, errands: updatedErrands };
          setLogged(updatedUser);
          saveData(updatedUser);
        } else {
          console.error('Erro ao desarquivar recado');
          alert('Erro ao desarquivar recado');
        }
      })
      .catch((error) => {
        console.error('Erro ao desarquivar recado', error);
        alert('Erro ao desarquivar recado');
      });
  }

  function filterErrands(description: string, archived: string) {
    if (!logged) return;

    

    fetch(`http://localhost:3333/users/${logged.id}/errands/filter?title=${description}&archived=${archived}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          
          console.log('Recados filtrados:', data.errands);
        } else {
          console.error('Erro ao filtrar recados');
          alert('Erro ao filtrar recados');
        }
      })
      .catch((error) => {
        console.error('Erro ao filtrar recados', error);
        alert('Erro ao filtrar recados');
      });
  }
  

  function saveData(user: User) {
    const storageKey = "logged";
    const loggedData = JSON.parse(sessionStorage.getItem(storageKey) ?? '');
    const updatedLoggedData = {
      ...loggedData,
      errands: user.errands || [],
    };
    sessionStorage.setItem(storageKey, JSON.stringify(updatedLoggedData));
}

  
  function logout() {
    sessionStorage.removeItem("logged");
    navigate("/");
  }

  return (
    <>
      <div>
        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
        
      </div>
      <br/>
      <div>
      <input type="text" value={filterDescription} onChange={(e) => setFilterDescription(e.target.value)} />
      <br/>
      <select value={filterArchived} onChange={(e) => setFilterArchived(e.target.value)}>
        <option value="">Todos</option>
        <option value="true">Arquivados</option>
        <option value="false">Desarquivados</option>
      </select>
      <br/>
      <button onClick={() => filterErrands(filterDescription, filterArchived)}>Filtrar</button>
    </div>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Meus Recados
      </Typography>
      <Grid container justifyContent={"center"}>
        <Grid item>
          <form
            style={{ width: "50vw" }}
            onSubmit={(e) => {
              e.preventDefault();
              addErrand();
            }}
          >
            <TextField
              fullWidth
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Título"
            />
            <br />
            <br />
            <TextField
              fullWidth
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              label="Descrição"
            />
            <br />
            <br />
            <Button sx={{ width: "50%", marginLeft: "25%" }} variant="contained" type="submit">
              Salvar
            </Button>
          </form>
        </Grid>
      </Grid>
      <br />
      <br />
      <div>
        <TableContainer component={Paper} sx={{ backgroundColor: "lightblue" }}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <strong>TÍTULO</strong>
        </TableCell>
        <TableCell align="center">
          <strong>DESCRIÇÃO</strong>
        </TableCell>
        <TableCell align="center">
          <strong>AÇÕES</strong>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {logged?.errands.map((errand) => {
        if (errand.archived) {
          return (
            <TableRow key={errand.id}>
              <TableCell style={{ display: "none" }} align="center">
                {errand.description}
              </TableCell>
              <TableCell style={{ display: "none" }} align="center">
                {errand.detail}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => unarchiveErrand(errand.id)}>
                  <UnarchiveIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        }

        return (
          <TableRow key={errand.id}>
            <TableCell align="center">{errand.description}</TableCell>
            <TableCell align="center">{errand.detail}</TableCell>
            <TableCell align="center">
              <IconButton onClick={() => deleteErrand(errand.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => editErrand(errand.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => archiveErrand(errand.id)}>
                <ArchiveIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>

      </div>
    </>
  );
};

export default List;
