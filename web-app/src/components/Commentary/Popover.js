import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useContext } from "react";
import { CommonContext } from "../../contexts/Common";
import MetaData from "../../Common/metaData";

export default function SimplePopover() {
  const { openPop, handleClosePop, anchorEl, id, name, classes, code } =
    useContext(CommonContext);

  return (
    <div>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.closeIcon}>
          <IconButton onClick={handleClosePop}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography className={classes.typography} variant="h5" gutterBottom>
          {name} {`(${code})`}
        </Typography>
        <hr />
        <MetaData />
      </Popover>
    </div>
  );
}
