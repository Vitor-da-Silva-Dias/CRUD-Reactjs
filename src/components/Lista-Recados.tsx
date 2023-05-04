import React, { useState, useEffect } from "react";
import User from "../types/User";
import { useNavigate } from "react-router-dom";
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';



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
      <IconButton onClick={logout}><LogoutIcon/></IconButton>
    </div>
    <Typography sx={{textAlign:'center'}} variant="h3">Meus Recados</Typography>
    <Grid container xs={12} justifyContent={'center'}>
      <form style={{width: '50vw'}} onSubmit={(e) => {
        e.preventDefault();
        addErrand();
      }}>
        
        <TextField
          fullWidth
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Descrição"
        />
        <br/><br/>
        <TextField
          fullWidth
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Detalhamento"
        />
        <br/><br/>
        <Button variant="contained" type="submit">Salvar</Button>
      </form>
    </Grid>
    <br/><br/>
  <div>
  <TableContainer component={Paper} sx={{backgroundColor:'lightblue'}}>
  <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'><strong>#</strong></TableCell>
            <TableCell align='center'><strong>TÍTULO</strong></TableCell>
            <TableCell align='center'><strong>DESCRIÇÃO</strong></TableCell>
            <TableCell align='center'><strong>AÇÕES</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logged?.errands.map((errand, index) => (
            <TableRow key={index}>
              <TableCell align='center'>{index + 1}</TableCell>
              <TableCell align='center'>{errand.title}</TableCell>
              <TableCell align='center'>{errand.description}</TableCell>
              <TableCell align='center'>
                <IconButton onClick={() => deleteErrand(index)}><DeleteIcon/></IconButton>
                <IconButton onClick={() => editErrand(index)}><EditIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
  </div>
  </>
      
    )
}

export default List;
