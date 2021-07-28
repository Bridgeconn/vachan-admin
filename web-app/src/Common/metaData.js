import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import { CommonContext } from "../contexts/Common";

function MetaData() {
  const { metaData, classes } = useContext(CommonContext);
  if (metaData === null) {
    return "";
  }
  return (
    <div>
      {metaData &&
        Object.keys(metaData).map((key) => (
          <div key={key}>
            <Typography className={classes.typography}>
              {key}: {metaData[key]}
            </Typography>
          </div>
        ))}
    </div>
  );
}
export default MetaData;
