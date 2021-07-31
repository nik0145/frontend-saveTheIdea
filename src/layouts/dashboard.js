import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import { Switch, Route } from "react-router-dom";
import Ideas from "../page/Ideas";
import Memes from "../page/Memes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItems from "../components/listItems";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

const Dashboard = ({children}) => {
    let { path, url } = useRouteMatch();
  const history = useHistory();
  const drawerWidth = 240;
  const userData = JSON.parse(localStorage.getItem("user") || "") || null;
  const { username } = userData;

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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // TODO https://www.apollographql.com/docs/react/caching/cache-interaction/#example-adding-an-item-to-a-list

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
            Текст
          </Typography>
          <Box mr={1}>
            <Typography>{username}</Typography>
          </Box>
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
        <List>
          <ListItems url={url}></ListItems>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Box m="2rem" className={classes.boxMain}>
          <Switch>
            <Route exact path={path}>
              <h3>Тут показываем какую нибудь дефолтную инфу</h3>
            </Route>
            <Route path={`${url}/ideas`}>
              <Ideas/>
            </Route>
            <Route path={`${url}/memes`}>
              <Memes/>
            </Route>
          </Switch>
        </Box>
      </main>
    </div>
  );
};
export default Dashboard;
