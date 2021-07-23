import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { BibleContext } from "../../contexts/BibleContext";
import BibleTable from "./BibleTable";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function Bibles() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const { isLoading, error, data: bibles } = useContext(BibleContext);
	if (isLoading) return "Loading...";

	if (error) return error.message;

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			{bibles.map((bible) => (
				<Accordion
					expanded={expanded === bible.language}
					onChange={handleChange(bible.language)}
					key={bible.languageVersions[0].sourceId}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<Typography className={classes.heading}>
							{bible.language}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<BibleTable bibles={bible.languageVersions} />
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
}
