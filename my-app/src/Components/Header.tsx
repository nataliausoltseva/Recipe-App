import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header() {
  return (
    <div className="App">
        <AppBar position='static' color='inherit'>
            <ToolBar>
                <Typography variant='h5' color='inherit' style={{justifyContent:"center", fontSize:"3vh"}}>
                    My Recipes
                </Typography>
            </ToolBar>
      </AppBar>
    </div>
  );
}

export default Header;