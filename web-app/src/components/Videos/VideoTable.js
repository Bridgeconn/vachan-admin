import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import { VideoContext } from "../../contexts/VideoContext";
import { CommonContext } from "../../contexts/Common";

const VideoTable = () => {
	const { videos } = useContext(VideoContext);
	const { classes } = useContext(CommonContext);
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Language</TableCell>
						<TableCell>Count</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.entries(videos).map(([key, value]) => (
						<TableRow key={key}>
							<TableCell>{key}</TableCell>
							<TableCell>{value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default VideoTable;
