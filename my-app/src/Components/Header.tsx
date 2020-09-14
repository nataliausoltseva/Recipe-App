import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
function Header() {
  const history = useHistory()
  return (
    <div className="App">
        <AppBar position='sticky' color='inherit' style={{width:"100%"}}>
            <ToolBar>
            <img src={require("./logo-transparent.png")} style={{width:"5em", cursor: "pointer"}} alt="logo of the page" onClick={()=> history.push("/")}/>
            <Typography variant='h5' color='inherit' style={{justifyContent:"center", fontSize:"3vh", cursor: "pointer"}} onClick={()=> history.push("/")}> 
                    My Recipes
                </Typography>
            </ToolBar>
      </AppBar>
    </div>
  );
}

export default Header;