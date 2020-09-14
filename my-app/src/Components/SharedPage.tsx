import React, { useEffect, useState } from 'react';
import {Grid, makeStyles, Theme, createStyles, Modal, Button, TextField} from '@material-ui/core';
import MediaCard from './MediaCard';
import { red } from '@material-ui/core/colors';
import './Styles.css';
import Header from '../Components/Header';

interface Recipes {
    recipeDescription: string;
    recipeDifficulty: string;
    recipeId: 0;
    recipeImageUrl: string;
    recipeIngredients:string;
    recipeName:string;
    commentingData:[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    paper: {
        marginTop:"45vh",
        marginLeft:"50vw",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign:"center"
      },
      saveButton:{
        float:"left",
        backgroundColor: "rgba(13, 204, 0, 0.6)",
        marginTop:"1em"
      },
      cancelButton:{
          float:"right",
          backgroundColor:"rgba(255, 25, 25, 0.33)",
          marginTop:"1em"
      }
      
  }),
);

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      width:"50%",
    };
}
interface Props{
    match: {
        params: {
            id: string|undefined;
        };
    };
}
function SharedPage( props:Props) {
    const [recipe, setRecipe] = useState<Recipes>({recipeDescription:"",recipeDifficulty:"",recipeId:0,recipeImageUrl:"",recipeIngredients:"",recipeName:"",commentingData:[]});

    useEffect(() => {
        fetch(`https://recipe-api-nu.azurewebsites.net/api/Recipes/${props.match.params.id}`)
        .then(response => response.json())
        .then(response => {
            setRecipe(response);
        });
         // eslint-disable-next-line
    }, [])
       

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const openModal =()=>{
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };
    
    const [modalStyle] = React.useState(getModalStyle)
    const body = (
        <div style={modalStyle} className={classes.paper} >
            <form className={classes.root} noValidate autoComplete="off" style={{height:"25em"}}>
                <TextField id="recipe-name-input" label="Recipe Name" defaultValue="" style={{width:"100%"}}/>
                <TextField id="recipe-difficulty-input" label="Recipe Difficulty" defaultValue="" style={{width:"100%"}}/>
                <TextField id="recipe-image-url-input" label="Recipe Image URL" defaultValue="" style={{width:"100%"}}/>
                <TextField
                    id="recipe-ingredients-input"
                    label="Recipe Ingredients"
                    multiline
                    variant="outlined"
                    rowsMax={3}
                    style={{marginTop:"1em",width:"100%"}}
                />
                <br/>
                <TextField
                    id="recipe-description-input"
                    label="Recipe Description"
                    multiline
                    rowsMax={3}
                    variant="outlined"
                    style={{marginTop:"1em",width:"100%"}}
                />

                <Button variant="contained" onClick={uploadRecipe} className={classes.saveButton} style={{textAlign:"center", float:"left",marginTop:"1em"}}>Save</Button>
                <Button variant="contained" onClick={closeModal} style={{float:"right",marginTop:"1em"}} className={classes.cancelButton}>Cancel</Button>
            </form>
        </div>
      );
      if(!recipe || !recipe.recipeDescription ){
        return;
    }
    return(
        <div>
            <Header/>
            <Grid container className="MediaGridContainer" style={{marginTop:"1em"}}>
            <Grid key="Shared Card" item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard RecipeId={recipe.recipeId} RecipeName={recipe.recipeName} RecipeDifficulty={recipe.recipeDifficulty} RecipeIngredients={recipe.recipeIngredients} RecipeDescription={recipe.recipeDescription} RecipeURL={recipe.recipeImageUrl} RecipeComments={recipe.commentingData}/>
            </Grid>
            </Grid>
            <Button variant="contained" onClick={openModal} id="addButton"> <span role="img" aria-label="add">&#10133;</span>  Add</Button>
            <Modal
                open={open}
                onClose={closeModal}
                style={{textAlign:"center"}}
                >
                    {body}
            </Modal>
        </div>
    );
}

function uploadRecipe(){

    const recipeInput = document.getElementById("recipe-name-input") as HTMLInputElement;
    const difficultyInput = document.getElementById("recipe-difficulty-input") as HTMLInputElement;
    const ingredientsInput = document.getElementById("recipe-ingredients-input") as HTMLInputElement;
    const descriptionInput = document.getElementById("recipe-description-input") as HTMLInputElement;
    const imageURLInput = document.getElementById("recipe-image-url-input") as HTMLInputElement;

    const name = recipeInput.value;
    const difficulty = difficultyInput.value;
    const ingredients = ingredientsInput.value;
    const description = descriptionInput.value;
    let imageURL = imageURLInput.value;

    fetch(imageURL,{
        method:"HEAD"
    }).then(response =>{
        if(response.status < 200 || response.status > 299){
            imageURL = "";
        } 
    });

    const JSONarray=({
        recipeName: name,
        recipeId: 0,
        recipeDifficulty: difficulty,
        recipeIngredients: ingredients,
        recipeDescription: description,
        recipeImageUrl:imageURL
    });
        
    fetch(`https://recipe-api-nu.azurewebsites.net/api/Recipes/`,{
        body: JSON.stringify(JSONarray),
        headers: {
            "Content-Type":"application/json",
            "cache-control":"no-cache"
        },
        method: "POST"
    }).then(response =>{
        if(!response.ok){
            alert(response.statusText + ". Please fill in the inputs!");
        }
        else{
            window.location.reload();
            }
    });
}
export default SharedPage