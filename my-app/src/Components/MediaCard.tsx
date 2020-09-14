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
import {EmailShareButton, FacebookShareButton, LineShareButton, RedditShareButton, TwitterShareButton, ViberShareButton, VKShareButton, WhatsappShareButton} from "react-share";
import {EmailIcon,FacebookIcon,LineIcon,RedditIcon,TwitterIcon, ViberIcon, VKIcon, WhatsappIcon} from "react-share";
import CopyToClipboard from 'react-copy-to-clipboard';
import CloseIcon from '@material-ui/icons/Close';
import './Styles.css';

interface IMediaCardProps {
    RecipeId: 0;
    RecipeName: string;
    RecipeDifficulty: string;
    RecipeIngredients: string;
    RecipeDescription: string;
    RecipeURL: string;
    RecipeComments:[];
}
interface Comments{
    commentingId:0;
    commentText:string;
    recipeId:0;
    userName:string;
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
        height:"5em"
      },
      cover: {
        width: "15em",
      },
      
    details: {
        display: 'flex',
        flexDirection: 'column',
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

function MediaCard(props: IMediaCardProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [expandComment, setexpandComment] = React.useState(false);

    const [comentData, setCommentData] = React.useState<Comments[]>([{commentingId:0, commentText:"", recipeId:0, userName:""}]);
    
    React.useEffect(()=>{
        setCommentData(props.RecipeComments);

        // eslint-disable-next-line
    },[])

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleExpandComment = () => {
        setexpandComment(!expandComment);
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
    const openCommentInputModel = () => {
        const form = document.getElementById("formComment") as HTMLInputElement;
        form.style.display = "block";
    }

    const closeCommentInputModel = () => {
        const form = document.getElementById("formComment") as HTMLInputElement;
        form.style.display = "none";
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

    function showMessage(){

    }

    function addComment(){       
        const userNameInput = document.getElementById("comment-user-name-input") as HTMLInputElement;
        const commentTextInput = document.getElementById("comment-text-input") as HTMLInputElement;

        const userName = userNameInput.value;
        const commentText = commentTextInput.value;

        const jsonArray=({
            commentingId:0,
            userName:userName,
            commentText:commentText,
            recipeId: props.RecipeId
        })
        fetch(`https://recipe-api-nu.azurewebsites.net/api/Commentings`,{
            body: JSON.stringify(jsonArray),
            headers:{
                "Content-Type":"application/json",
                "cache-control":'no-cahce'
            },
            method:"POST"
        }).then(response =>{
            if(!response.ok){
                alert(response.statusText + ". Please fill in the inputs!");
            }
            else{
                window.location.reload();
                }
        });
    }
    const [modalStyle] = React.useState(getModalStyle)
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form noValidate autoComplete="off" style={{height:"25em"}}>
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

                
                <Button size="small" color="primary" onClick={uploadRecipe} className={classes.saveButton} >Save</Button>
                <Button size="small" color="primary" onClick={closeModal} className={classes.cancelButton}>Cancel</Button>
            </form>
        </div>
      );
    let returningBody = (
        `\n Difficulty is: ${props.RecipeDifficulty} \n Ingredients are: ${props.RecipeIngredients} \n Method is: ${props.RecipeDescription} \n ${props.RecipeURL}`
    );
    let sharingUrl = `https://recipe-api-nu.azurewebsites.net/api/Recipes/${props.RecipeId}`;
    const shareBody = (
        <div style={modalStyle} className={classes.paper}>
            <IconButton
                onClick={closeShare}
                style={{float:"right"}}
                aria-label="Close Share section"
            >
                <CloseIcon/>
            </IconButton>
            <br/>
            <FacebookShareButton url={sharingUrl} quote={`Name: ${props.RecipeName} ` +returningBody}>
                <FacebookIcon size={32} round={true} />     
            </FacebookShareButton>

            <TwitterShareButton url={sharingUrl} via = {`Name: ${props.RecipeName} ` +returningBody}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton> 
            <ViberShareButton url={sharingUrl} title={props.RecipeName}>
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
                <Button id="copyToClipboard" onClick={showMessage}>Copy URL to the clipboard</Button>
            </CopyToClipboard>
        </div>
      )
    let mediaBody;

    if(!props.RecipeURL){
        mediaBody = (
            <div>
                <CardContent style={{height:"5em"}}>
                    <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold", fontFamily:"fantasy"}}>
                        {props.RecipeName}
                    </Typography>

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
                        <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold", fontFamily:"fantasy",width:"5em"}}>
                            {props.RecipeName}
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription" style={{fontWeight:"bold"}}>
                            {props.RecipeDifficulty}
                        </Typography>
                    </CardContent>              
                </div>
                <CardMedia
                    className="cardImage"
                    image={props.RecipeURL}
                    title={props.RecipeName}
                    aria-label={props.RecipeName}
                />
            </div>
        );

    }
    return (
        <div>
            <Card className="MediaCardContainer" >
                {mediaBody}
                <CardActions disableSpacing>
                    <Button size="small" color="primary" onClick={deleteRecipe}> Delete</Button>
                    <Button size="small" color="primary" onClick={openModal}>Edit</Button>
                    <Button size="small" color="primary" onClick={openShare}>Share</Button>
                    <Button size="small" color="primary" onClick={handleExpandComment}>Comment</Button>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Expand ingredietns and method section"
                        >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expandComment} timeout="auto" unmountOnExit >
                <Typography variant="body2" component="p" style={{ fontSize:"2vh" , paddingTop: 5,listStyleType:"none"}}>
                    {comentData.map((item,i)=>
                    <li key={i}>{item.userName} said: {item.commentText}</li>)}
                </Typography>
                <Button size="small" color="primary" onClick={openCommentInputModel} className="editButton">Add your comment</Button>
                <form noValidate autoComplete="off" id="formComment" style={{display:"none"}}>
                    <TextField id="comment-user-name-input" label="Comment User Name" defaultValue="" style={{width:"100%"}}/>
                    <br/>
                    <TextField
                        id="comment-text-input"
                        label="Your comment"
                        multiline
                        rowsMax={3}
                        variant="outlined"
                        style={{marginTop:"1em",width:"100%"}}
                        defaultValue=""
                    />
                    <Button size="small" color="primary" onClick={addComment} className={classes.saveButton}>Save</Button>
                    <Button size="small" color="primary" onClick={closeCommentInputModel} className={classes.cancelButton}>Cancel</Button>
                </form>
                </Collapse>
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