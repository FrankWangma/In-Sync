import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import CreateJoinRoomButton from '../components/CreateJoinRooms'


class MainPage extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <Typography variant='h1'>
                                In-Sync
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CreateJoinRoomButton />
                        </Grid>
                    </Grid>
                </header>
            </div>
        );
    }
}

export default MainPage;
