import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { Link } from "react-router-dom";
 const mainListItems = ({url=''})=>{
    return (
      <div>
        <ListItem button component={Link} to={`${url}/ideas`}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Идеи" />
        </ListItem>
        <ListItem button component={Link} to={`${url}/memes`}>
          <ListItemIcon>
            <PhotoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Мемы" />
        </ListItem>
      </div>
    );
};

export default mainListItems;