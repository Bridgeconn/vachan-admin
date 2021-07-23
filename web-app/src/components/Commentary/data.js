import { useContext, useState } from "react";
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
import { Commentary } from "../../contexts/commentary";
import { CommonContext } from "../../contexts/Common";
import SimplePopover from "./Popover";

function Data() {
  const { isLoading, error, data: commentaries } = useContext(Commentary);
  if (isLoading) return "Loading...";

  if (error) return error.message;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { id, handleClick, classes } = useContext(CommonContext);
  return (
    <div>
      {commentaries.map((language) => (
        <div className={classes.root} key={language.languageCode}>
          <Accordion
            expanded={expanded === language.languageCode}
            onChange={handleChange(language.languageCode)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
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
                    {language.commentaries.map((element) => (
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

export default Data;
