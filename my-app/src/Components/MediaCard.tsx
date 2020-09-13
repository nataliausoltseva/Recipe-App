import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles, CardMedia, Button, TextField } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import Modal from "@material-ui/core/Modal";
import {EmailShareButton, FacebookShareButton, LineShareButton, LinkedinShareButton, RedditShareButton, TwitterShareButton, ViberShareButton, VKShareButton, WhatsappShareButton} from "react-share";
import {EmailIcon,FacebookIcon,LineIcon,LinkedinIcon, RedditIcon,TwitterIcon, ViberIcon, VKIcon, WhatsappIcon} from "react-share";
import CopyToClipboard from 'react-copy-to-clipboard';

interface IMediaCardProps {
    RecipeId: 0;
    RecipeName: string;
    RecipeDifficulty: string;
    RecipeIngredients: string;
    RecipeDescription: string;
    RecipeURL: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
        top:0,
        marginTop:"45vh",
        marginLeft:"50vw",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign:"center",
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: "15em",
      },
      
    details: {
        display: 'flex',
        flexDirection: 'column',
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
      width:"50%",
    };
  }

function MediaCard(props: IMediaCardProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const [open, setOpen] = React.useState(false);

    const openModal =()=>{
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    };

    const [share, setShare] = React.useState(false);

    const openShare =()=>{
        setShare(true);
    }
    const closeShare =()=>{
        setShare(false);
    }

    function deleteRecipe(){
        fetch(`https://recipe-api-nu.azurewebsites.net/api/Recipes/${props.RecipeId}`,{
            method:"DELETE"
        }).then(response => {
            if(!response.ok){
                alert(response.statusText);
            }
            else {
                window.location.reload();
            }
        })
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
            recipeId: props.RecipeId,
            recipeDifficulty: difficulty,
            recipeIngredients: ingredients,
            recipeDescription: description,
            recipeImageUrl:imageURL
        });
        
        fetch(`https://recipe-api-nu.azurewebsites.net/api/Recipes/${props.RecipeId}`,{
            body: JSON.stringify(JSONarray),
            headers: {
                "Content-Type":"application/json",
                "cache-control":"no-cache"
            },
            method: "PUT"
        }).then(response =>{
            if(!response.ok){
                alert(response.statusText);
            }
            else{
                window.location.reload();
            }
        })
    }

    const [modalStyle] = React.useState(getModalStyle)
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form noValidate autoComplete="off">
                <TextField id="recipe-name-input" label="Recipe Name" defaultValue={props.RecipeName} style={{width:"100%"}}/>
                <TextField id="recipe-difficulty-input" label="Recipe Difficulty" defaultValue={props.RecipeDifficulty} style={{width:"100%"}}/>
                <TextField id="recipe-image-url-input" label="Recipe Image URL" defaultValue={props.RecipeURL} style={{width:"100%"}}/>
                <TextField
                    id="recipe-ingredients-input"
                    label="Recipe Ingredients"
                    multiline
                    variant="outlined"
                    rowsMax={3}
                    style={{marginTop:"1em",width:"100%"}}
                    defaultValue={props.RecipeIngredients}
                />
                <br/>
                <TextField
                    id="recipe-description-input"
                    label="Recipe Description"
                    multiline
                    rowsMax={3}
                    variant="outlined"
                    style={{marginTop:"1em",width:"100%"}}
                    defaultValue={props.RecipeDescription}
                />

                <Button variant="contained" onClick={uploadRecipe} id="saveButton" >Save</Button>
            </form>
        </div>
      );

    let sharingUrl = `https://recipe-api-nu.azurewebsites.net/api/Recipes/${props.RecipeId}`;
    const shareBody = (
        <div style={modalStyle} className={classes.paper}>
            <FacebookShareButton url={sharingUrl}>
                <FacebookIcon size={32} round={true} />     
            </FacebookShareButton>

            <TwitterShareButton url={sharingUrl}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton> 

            <LinkedinShareButton url={sharingUrl} >
                <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton> 

            <ViberShareButton url={sharingUrl}>
                <ViberIcon size={32} round={true} />
            </ViberShareButton> 

            <VKShareButton url={sharingUrl}>
                <VKIcon size={32} round={true} />
            </VKShareButton> 

            <WhatsappShareButton url={sharingUrl}>
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton> 

            <EmailShareButton url={sharingUrl}>
                <EmailIcon size={32} round={true} />
            </EmailShareButton>

            <RedditShareButton url={sharingUrl}>
                <RedditIcon size={32} round={true} />
            </RedditShareButton>

            <LineShareButton url={sharingUrl}>
                <LineIcon size={32} round={true} />
            </LineShareButton>
            <br/>
            <CopyToClipboard text={sharingUrl}>
                
                <button>Copy URL to the clipboard</button>
            </CopyToClipboard>
        </div>
      )
    let mediaBody;

    if(!props.RecipeURL){
        mediaBody = (
            <div>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold", fontFamily:"fantasy"}}>
                        {props.RecipeName}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold"}}>
                        {props.RecipeDifficulty}
                    </Typography>
                </CardContent>
                
            </div>
        );
    }
    else {
        mediaBody = (
            <div className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold", fontFamily:"fantasy"}}>
                            {props.RecipeName}
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold"}}>
                            {props.RecipeDifficulty}
                        </Typography>
                    </CardContent>              
                </div>
                <CardMedia
                    id="cardImage"
                    image={props.RecipeURL}
                    title={props.RecipeName}
                />
            </div>
        );

    }

    return (
        <div>
            <Card className="MediaCardContainer" >
                {mediaBody}
                <CardActions disableSpacing>
                    <Button size="small" color="primary" onClick={deleteRecipe} id="deleteButton"> Delete</Button>
                    <Button size="small" color="primary" onClick={openModal} id="editButton">Edit</Button>
                    <Button size="small" color="primary" onClick={openShare} id="editButton">Share</Button>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
               
                <Collapse in={expanded} timeout="auto" unmountOnExit >
                    <CardContent>
                        <Typography paragraph style={{fontWeight:"bold", textDecoration:"underline"}}>Ingredients:</Typography>
                        <Typography paragraph >
                            {props.RecipeIngredients}
                        </Typography>
                        <Typography paragraph style={{fontWeight:"bold", textDecoration:"underline"}}>Method:</Typography>
                        <Typography paragraph >
                            {props.RecipeDescription}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Modal
                open={open}
                onClose={closeModal}
                style={{textAlign:"center"}}
            >
                {body}
            </Modal>

            <Modal
                open={share}
                onClose={closeShare}
                style={{textAlign:"center"}}
            >
                {shareBody}
            </Modal>

        </div>
    )
}
export default MediaCard