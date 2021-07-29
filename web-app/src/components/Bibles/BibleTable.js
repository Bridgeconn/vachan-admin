import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import Paper from "@material-ui/core/Paper";
import ModalBox from "./ModalBox";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const BibleTable = ({ bibles }) => {
	const classes = useStyles();
	const [book, setBook] = useState("");
	const [audioInfo, setAudioInfo] = useState("");

	useEffect(() => {
		fetch("https://api.autographamt.com/v1/booknames")
			.then((res) => res.json())
			.then((data) => {
				const language = bibles[0].language.code;
				const obc = data.find(
					(item) => item.language.code === language
				);
				if (obc) {
					setBook(obc.bookNames.length);
				}
			});

		const audioBible = bibles[0].audioBible.name;
		if (audioBible === null) {
			setAudioInfo(<VolumeOffIcon />);
		} else {
			setAudioInfo(<VolumeUpIcon />);
		}
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Code</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Revision</TableCell>
						<TableCell>Books</TableCell>
						<TableCell>Audio Bible</TableCell>
						<TableCell>Metadata</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{bibles &&
						bibles.map((language) => (
							<TableRow key={language.version.code}>
								<TableCell>{language.version.code}</TableCell>
								<TableCell>{language.version.name}</TableCell>
								<TableCell>
									{language.version.longName}
								</TableCell>
								<TableCell>{book}</TableCell>
								<TableCell>{audioInfo}</TableCell>
								<TableCell>
									<ModalBox
										versionName={language.version.name}
										code={language.version.code}
										metaData={language.metadata}
									/>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
BibleTable.propTypes = {
	bibles: PropTypes.instanceOf(Array).isRequired,
};

export default BibleTable;
