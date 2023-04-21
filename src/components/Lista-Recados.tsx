import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Divider, Grid, Typography, TextField, Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, {useMemo, useState} from "react";
import Recado from "../types/Recado";
import DialogConfirm from "./DialogConfirm";


const List: React.FC = () => {
    

    const [list, setList] = useState<Recado[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>(''); 
    const [open, setOpen] = useState<boolean>(false);
    const [idRemove, setIdRemove] = useState<number | undefined>();
    

    const listaProdutos = useMemo(() => {
        return list.map(item => {
          return (
            <React.Fragment key={item.id}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton onClick={() => editList(item.id)} edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openRemoveModal(item.id)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>{item.title[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.description} />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [list]);
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const openRemoveModal = (id: number) => {
        setIdRemove(id);
        setOpen(true);
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.target.value);
      };
    
      const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDescription(e.target.value);
      };
    
      const addList = () => {
        if (title.length) {
          const tempId = new Date().getTime();
          setList([...list, { id: tempId, description: description, title: title, enable: true }]);
        }
    
        setTitle('');
        setDescription('');
      };
    
      const editList = (id: number) => {
        const index = list.findIndex(item => item.id === id);
        const newTitle: any = prompt('edit titulo');
        const newDescription: any = prompt('edit Preço');
        const newList = [...list];
        
        if(newTitle === '' || newDescription === ''){
          alert("Não se pode deixar campos em branco! Favor preencher corretamente.")
          return list;
        }

        if(newTitle != null || newDescription != null){
          newList[index].title = newTitle;
          newList[index].description = newDescription;
        }
        
        setList(newList);
      };
    
      const removeItems = () => {
        const index = list.findIndex(item => item.id === idRemove);
        if (index !== -1) {
          setList(prevState => {
            prevState.splice(index, 1);
            return [...prevState];
          });
        }
        setOpen(false);
      };
    
      return (
        <Grid container spacing={4}>
          <Grid item xs={11}>
            <Typography variant="h3">Recados</Typography>
          </Grid>
          <Grid item xs={1}>
            <LogoutIcon/>
          </Grid>
          <Divider/>
          <Grid item xs={5}>
            <TextField fullWidth value={title} label="Título" onChange={e => handleChange(e)} />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              value={description}
              label="Descrição"
              onChange={e => handleChangeDescription(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={addList}>
              Cadastrar
            </Button>
          </Grid>
    
          <Grid item xs={12}>
            {listaProdutos};
          </Grid>
    
          <DialogConfirm
            title={'Deseja excluir produto?'}
            subTitle={title}
            openDialog={open}
            actionConfirm={removeItems}
            actionCancel={handleClose}
          />
        </Grid>
      );
    };
    
    export default List;
    
