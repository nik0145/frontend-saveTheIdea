import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
// import Box from "@material-ui/core/Box";
import { Formik, Field, Form } from "formik";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { mainListItems, secondaryListItems } from "../components/listItems";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { TextField } from "formik-material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IDEAS_QUERY from "../queries/idea/ideas";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Collapse from "@material-ui/core/Collapse";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ADD_IDEA from "../queries/idea/addIdea";
import DELETE_IDEA from "../queries/idea/deleteIdea";
import DeleteDialog from "../components/deleteModal";

const Dashboard = () => {
    const history = useHistory();
  const drawerWidth = 240;
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
  const onLogout = () => {
      handleCloseMenu();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push("/");
  };
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onOpenModalDelete = (id) => {
    setIdDelete(id);
    handleClickOpenDelete();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // TODO https://www.apollographql.com/docs/react/caching/cache-interaction/#example-adding-an-item-to-a-list
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
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },

    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      overflow: "auto",
      flexDirection: "row",
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Идеи
          </Typography>
          <Avatar>
            <IconButton
              aria-label="Меню пользователя"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClickMenu}
            >
              <AccountCircleIcon />
            </IconButton>
          </Avatar>
          <Menu
            id="user-menu"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>Профиль</MenuItem>
            <MenuItem onClick={onLogout}>Выйти</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Box m="2rem">
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
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
        </Box>
      </main>
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
export default Dashboard;
