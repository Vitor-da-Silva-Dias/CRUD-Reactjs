import React from "react";
import Login from "../components/Login";
import { Grid } from "@mui/material";

const Home: React.FC = () => {
    return(
        <Grid container height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={2}>
                <Login/>
            </Grid>
        </Grid>
    )
}

export default Home;