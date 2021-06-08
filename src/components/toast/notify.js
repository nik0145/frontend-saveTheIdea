import { Snackbar } from "@material-ui/core";
import ReactDOM from "react-dom";
function show(text = "", type = "success", timeout = 3000) {
  //success error warning info
  const target = document.querySelector(".notification-wrapper");
  console.log('kkee')
  ReactDOM.render(
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      message={text}
      open={true}
      key={new Date().getTime()}
      autoHideDuration={timeout}
    />,
    target
  );
}

export {show };
