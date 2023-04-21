import React from "react";
import { Grid } from "@mui/material";

interface HomeProps {
    component: React.FC;
}

const Home: React.FC<HomeProps> = ({component: Component}) => {
    return(
        <Grid container height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={4}>
                <Component/>
            </Grid>
        </Grid>
    )
}

export default Home;