import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useContext } from "react";
import { ReadingPlanContext } from "../../contexts/readingplan";
import { CommonContext } from "../../contexts/Common";

function ReadingPlan() {
  const {
    isLoading,
    error,
    data: readingData,
  } = useContext(ReadingPlanContext);
  const { classes } = useContext(CommonContext);
  if (isLoading) return "Loading....";
  if (error) return error.message;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {readingData.map((element) => (
              <TableRow key={element.name}>
                <TableCell>{element.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ReadingPlan;
