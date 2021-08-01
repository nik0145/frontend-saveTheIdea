import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Card from "@material-ui/core/Card";
import { CheckboxWithLabel } from "formik-material-ui";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import UPLOAD_FILE from "../queries/fileUpload";
import ADD_MEME from "../queries/meme/createMeme";
import DELETE_MEME from "../queries/meme/deteteMeme";
import MEMES_QUERY from "../queries/meme/memes";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteDialog from "../components/deleteModal";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from "@material-ui/core/colors";
const url = process.env.REACT_APP_API_URL;
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
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
const Memes = () => {
  const classes = useStyles();
  const [onUpload] = useMutation(UPLOAD_FILE);
  const [addMeme] = useMutation(ADD_MEME);
   const [deleteMeme] = useMutation(DELETE_MEME);
 const [openDelete, setOpenDelete] = useState(false);
 const [idDelete, setIdDelete] = useState(null);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
   const handleCloseDelete = () => {
     setOpenDelete(false);
   };
    const onDeleteMeme = async () => {
      await deleteMeme({ variables: { id: idDelete } });
      await refetchMemes();
      setIdDelete(null);
      handleCloseDelete();
    };
  const handleAddMeme = async ({ isPublish }, { setSubmitting }) => {
    try {
      const { data } = await onUpload({
        variables: {
          file: image,
          field: "image",
          ref: "memes",
        },
      });
      const userData = JSON.parse(localStorage.getItem("user") || "") || null;
      const { id } = userData;
      await addMeme({
        variables: {
          image: data.upload.id,
          users_permissions_user: id,
          publish: isPublish,
        },
      });
    } catch (error) {
      console.log(error);
    }

    // console.log(values);
    //    await addMeme({ variables: values });
    //    await refetchMeme();
    setSubmitting(false);
    handleClose();
  };

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");

 const onOpenModalDelete = (id) => {
   setIdDelete(id);
   handleClickOpenDelete();
 };
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  const onChangeImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const { loading, error, data, refetch: refetchMemes } = useQuery(MEMES_QUERY);
  
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
        Добавить Мем
      </Button>
      <Container maxWidth="lg" className={classes.container}>
        {/* Chart */}
        {data.memes.map((meme) => {
          return (
            <Card key={meme.id} className={classes.cardRoot}>
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
                title={meme.users_permissions_user?.username  ? meme.users_permissions_user.username:'' }
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image={`${url}${meme.image.url}`}
                title="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {meme.publish}
                  {meme.publish ? "Видно всем" : "Видно только вам"}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => onOpenModalDelete(meme.id)}
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
        maxWidth={"xl"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавить мем</DialogTitle>

        <Formik
          initialValues={{
            isPublish: false,
          }}
          onSubmit={handleAddMeme}
        >
          {({ submitForm, isSubmitting }) => (
            <DialogContent>
              <Form className={classes.form}>
                <div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    onChange={onChangeImage}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="mems"
                      style={{ objectFit: "cover" }}
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  ) : (
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        color="primary"
                        component="span"
                      >
                        Загрузить
                      </Button>
                    </label>
                  )}
                </div>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  color="primary"
                  name="isPublish"
                  Label={{ label: "Видно всем" }}
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
        name="мем"
        onClose={handleCloseDelete}
        onClick={handleClickOpenDelete}
        onDelete={onDeleteMeme}
      ></DeleteDialog>
    </div>
  );
};
export default Memes;
