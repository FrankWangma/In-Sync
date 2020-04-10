import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import CreateRoomButton from '../components/CreateRoomButton'


class MainPage extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant='h1'>
                                In-Sync
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CreateRoomButton />
                        </Grid>
                    </Grid>
                </header>
            </div>
        );
    }
}

export default MainPage;
