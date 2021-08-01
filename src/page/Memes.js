import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CheckboxWithLabel } from "formik-material-ui";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import UPLOAD_FILE from "../queries/fileUpload";
const useStyles = makeStyles((theme) => ({
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
  const handleAddMeme = async (values) => {
      try {
        console.log(image);
        let ekek = await onUpload({
          variables: {
            file: image,
            field: "image",
            ref: "memes",
            // publish: false,
          },
        });
        console.log(ekek);
      } catch (error) {
        console.log(error);
      }
      
    // console.log(values);
    //    await addIdea({ variables: values });
    //    await refetchIdea();
    //    setSubmitting(false);
    // handleClose();
  };

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
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
    </div>
  );
};
export default Memes;
