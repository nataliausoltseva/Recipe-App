import React, { useEffect, useState } from 'react';
import {Grid, makeStyles, Theme, createStyles, Modal, Button, TextField} from '@material-ui/core';
import MediaCard from './MediaCard';
import { red } from '@material-ui/core/colors';
import './Styles.css';

interface Recipes {
    recipeDescription: string;
    recipeDifficulty: string;
    recipeId: 0;
    recipeImageUrl: string;
    recipeIngredients:string;
    recipeName:string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
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
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
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
    };
}

  
function MainPage() {
    const [recipe, setRecipe] = useState<Recipes[]>([{recipeDescription:"",recipeDifficulty:"",recipeId:0,recipeImageUrl:"",recipeIngredients:"",recipeName:""}])

    useEffect(() => {
        fetch(`http://recipe-api-nu.azurewebsites.net/api/Recipes`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setRecipe(response);
        });
        // eslint-disable-next-line
    }, [])
    console.log(recipe);
    var Cards: JSX.Element[] = [];
    recipe.forEach((el: Recipes, i: Number) => {
        if(!el || !el.recipeDescription ){
            return;
        }
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard RecipeId={el.recipeId} RecipeName={el.recipeName} RecipeDifficulty={el.recipeDifficulty} RecipeIngredients={el.recipeIngredients} RecipeDescription={el.recipeDescription} RecipeURL={el.recipeImageUrl} />
            </Grid>
            ) 
    })
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
        <div style={modalStyle} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField required id="recipe-name-input" label="Recipe Name" defaultValue="" style={{width:"100%"}}/>
                <TextField required id="recipe-difficulty-input" label="Recipe Difficulty" defaultValue="" style={{width:"100%"}}/>
                <TextField required id="recipe-image-url-input" label="Recipe Image URL" defaultValue="" style={{width:"100%"}}/>
                <TextField required id="recipe-ingredients-input" label="Recipe Ingredients" defaultValue="" style={{width:"100%"}}/>
                <TextField required id="recipe-description-input" label="Recipe Description" defaultValue="" style={{width:"100%"}}/>

                <Button variant="contained" onClick={uploadRecipe} id="saveButton" style={{textAlign:"center"}}>Save</Button>
            </form>
        </div>
      );

    return(
        <div>
            <Grid container spacing={3} className="MediaGridContainer" style={{marginTop:"1em"}}>
                {Cards}
            </Grid>
            
            <Button variant="contained" onClick={openModal} id="addButton"> &#10133; Add</Button>

            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
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
    const imageURL = imageURLInput.value;

    const JSONarray=({
        recipeName: name,
        recipeId: 0,
        recipeDifficulty: difficulty,
        recipeIngredients: ingredients,
        recipeDescription: description,
        recipeImageUrl:imageURL
    });
        
    fetch(`http://recipe-api-nu.azurewebsites.net/api/Recipes/`,{
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
    })
    console.log(JSONarray);
    console.log("Where POST APi is going to be called to save recipe");
}
export default MainPage