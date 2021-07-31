import { useState } from "react";
import { Formik, Field, Form } from "formik";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import { TextField } from "formik-material-ui";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import IDEAS_QUERY from "../queries/idea/ideas";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ADD_IDEA from "../queries/idea/addIdea";
import DELETE_IDEA from "../queries/idea/deleteIdea";
import DeleteDialog from "../components/deleteModal";


const Ideas = () => {
 const [openDelete, setOpenDelete] = useState(false);
 const [idDelete, setIdDelete] = useState(null);

 const handleClickOpenDelete = () => {
   setOpenDelete(true);
 };
 const handleAddIdea = async (values, { setSubmitting }) => {
   await addIdea({ variables: values });
   await refetchIdea();
   setSubmitting(false);
   handleClose();
 };

 const handleCloseDelete = () => {
   setOpenDelete(false);
 };

 const onOpenModalDelete = (id) => {
   setIdDelete(id);
   handleClickOpenDelete();
 };

 const onDeleteIdea = async () => {
   await deleteIdea({ variables: { id: idDelete } });
   await refetchIdea();
   setIdDelete(null);
   handleCloseDelete();
 };
 const useStyles = makeStyles((theme) => ({
   root: {
     display: "flex",
   },
   cardRoot: {
     minWidth: 300,
     margin: "1rem",
   },
   media: {
     height: 0,
     paddingTop: "56.25%", // 16:9
   },
   avatar: {
     backgroundColor: red[500],
   },

   toolbar: {
     paddingRight: 24, // keep right padding when drawer closed
   },


   title: {
     flexGrow: 1,
   },
 
   container: {
     paddingTop: theme.spacing(4),
     display: "flex",
     flexWrap: "wrap",
     overflow: "hidden",
     flexDirection: "row",
     paddingBottom: theme.spacing(4),
   },
   boxMain: {
     width: "100%",
   },

   fixedHeight: {
     height: 240,
   },
 }));

 const classes = useStyles();
 const [openModal, setOpenModal] = useState(false);
 const handleClickOpen = () => {
   setOpenModal(true);
 };

 const handleClose = () => {
   setOpenModal(false);
 };
 //TODO устал возиться с обновлением кеша, оставлю это на будущее
 const [addIdea] = useMutation(ADD_IDEA);

 const [deleteIdea] = useMutation(DELETE_IDEA);
 const { loading, error, data, refetch: refetchIdea } = useQuery(IDEAS_QUERY);
 if (loading) return "Loading...";
 if (error) return `Error! ${error.message}`;

return (
  <div>
    <Button
      onClick={handleClickOpen}
      variant="contained"
      color="primary"
      disableElevation
    >
      Добавить идею
    </Button>
    <Container maxWidth="lg" className={classes.container}>
      {/* Chart */}
      {data.ideas.map((idea) => {
        return (
          <Card key={idea.id} className={classes.cardRoot}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image="https://i.picsum.photos/id/883/200/200.jpg?hmac=evNCTcW3jHI_xOnAn7LKuFH_YkA8r6WdQovmsyoM1IY"
              title="Paella dish"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {idea.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {idea.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => onOpenModalDelete(idea.id)}
                aria-label="delete"
              >
                <DeleteIcon variant="contained" color="error" />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Container>
    <Dialog
      open={openModal}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Добавить идею</DialogTitle>

      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={handleAddIdea}
      >
        {({ submitForm, isSubmitting }) => (
          <DialogContent>
            <Form>
              <Field
                component={TextField}
                name="title"
                type="text"
                label="Название"
              />
              <br />
              <Field
                component={TextField}
                type="text"
                label="Описание"
                name="description"
              />
              {isSubmitting && <LinearProgress />}
              <DialogActions>
                <Button onClick={submitForm} color="primary">
                  Сохранить
                </Button>
              </DialogActions>
            </Form>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
    <DeleteDialog
      open={openDelete}
      onClose={handleCloseDelete}
      onClick={handleClickOpenDelete}
      onDelete={onDeleteIdea}
    ></DeleteDialog>
  </div>
);
};
export default Ideas;
