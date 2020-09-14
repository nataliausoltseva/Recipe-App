import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
function Header() {
  return (
    <div className="App">
        <AppBar position='sticky' color='inherit' style={{width:"100%"}}>
            <ToolBar>
              <img src={require("./logo-transparent.png")} style={{width:"5em"}} alt="logo of the page"/>
                <Typography variant='h5' color='inherit' style={{justifyContent:"center", fontSize:"3vh"}}> 
                    My Recipes
                </Typography>
            </ToolBar>
      </AppBar>
    </div>
  );
}

export default Header;