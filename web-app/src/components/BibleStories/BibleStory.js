import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BiBleStoryContext } from "../../contexts/BibleStory";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    textTransform: "capitalize",
  },
}));

function BibleStories() {
  const { bibleStory } = useContext(BiBleStoryContext);
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Language</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            Object.keys(bibleStory).map((key)=>(
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{bibleStory[key]}</TableCell>
            </TableRow>
))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default BibleStories;
