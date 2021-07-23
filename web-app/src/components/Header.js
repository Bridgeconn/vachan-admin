import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function Header() {
	const classes = useStyles();
	const [state, setState] = useState({
		checkedA: true,
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Vachan Admin
					</Typography>
					<Typography component="div" className={classes.title}>
						<Grid
							component="label"
							container
							alignItems="center"
							spacing={1}
						>
							<Grid item>Staging</Grid>
							<Grid item>
								<Switch
									checked={state.checkedC}
									onChange={handleChange}
									name="checkedA"
								/>
							</Grid>
							<Grid item>Production</Grid>
						</Grid>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
