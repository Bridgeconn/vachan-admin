import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import { DictonaryContext } from "../../contexts/dictonary";
import SimplePopover from "./Popover";
import { CommonContext } from "../../contexts/Common";

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
function DictonaryData() {
  const { isLoading, error, data: dictonary } = useContext(DictonaryContext);
  if (isLoading) return "Loading...";
  if (error) return error.message;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { id, handleClick } = useContext(CommonContext);
  return (
    <div>
      {dictonary.map((language) => (
        <div key={language.languageCode}>
          <Accordion
            expanded={expanded === language.languageCode}
            onChange={handleChange(language.languageCode)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading} variant="h1" gutterBottom>
                {language.language}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Meta Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {language.dictionaries.map((element) => (
                      <TableRow key={element.sourceId}>
                        <TableCell>{element.code}</TableCell>
                        <TableCell>{element.name}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-describedby={id}
                            onClick={(e) =>
                              handleClick(
                                e,
                                element.metadata,
                                element.name,
                                element.code
                              )
                            }
                          >
                            <InfoIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <SimplePopover />
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export default DictonaryData;
