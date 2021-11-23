import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useContext } from "react";
import { CommonContext } from "../../contexts/Common";

function BibleStories() {
	const { classes, bibleStory } = useContext(CommonContext);
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
						{Object.keys(bibleStory).map((key) => (
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
