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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Commentary } from "../../contexts/commentary";
import CustomizedDialogs from "./Dialog";
import { CommonContext } from "../../contexts/Common";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	table: {
		minWidth: 650,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
		textTransform: "capitalize",
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

function Data() {
	const { isLoading, error, data: commentaries } = useContext(Commentary);
	if (isLoading) return "Loading...";

	if (error) return error.message;
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const { handleClickOpen } = useContext(CommonContext);
	return (
		<div>
			{commentaries.map((commentary) => (
				<div
					className={classes.root}
					key={commentary.commentaries[0].sourceId}
				>
					<Accordion
						expanded={
							expanded === commentary.commentaries[0].sourceId
						}
						onChange={handleChange(
							commentary.commentaries[0].sourceId
						)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography
								className={classes.heading}
								variant="h1"
								gutterBottom
							>
								{commentary.language}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<TableContainer component={Paper}>
								<Table
									className={classes.table}
									aria-label="simple table"
								>
									<TableHead>
										<TableRow>
											<TableCell>Code</TableCell>
											<TableCell>Name</TableCell>
											<TableCell>Meta Data</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{commentary.commentaries.map(
											(element) => (
												<TableRow
													key={element.sourceId}
												>
													<TableCell>
														{element.code}
													</TableCell>
													<TableCell>
														{element.name}
													</TableCell>
													<TableCell>
														<IconButton
															onClick={() =>
																handleClickOpen(
																	{
																		name: element.name,
																	}
																)
															}
														>
															<MoreVertIcon />
														</IconButton>
													</TableCell>
												</TableRow>
											)
										)}
									</TableBody>
								</Table>
								<CustomizedDialogs />
							</TableContainer>
						</AccordionDetails>
					</Accordion>
				</div>
			))}
		</div>
	);
}

export default Data;
