import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

class CreateRoomButton extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" size="large">
                            <Grid item xs={6}>
                                <Typography variant={'h5'}>
                                    Join Room   
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'subtitle1'}>
                                    Join an existing In-Sync room   
                                </Typography>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" size="large">
                            <Grid item xs={6}>
                                <Typography variant={'h5'}>
                                    Create Room   
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant={'subtitle1'}>
                                    Create a new In-Sync room   
                                </Typography>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>
                </header>
            </div>
        );
    }
}

export default CreateRoomButton;