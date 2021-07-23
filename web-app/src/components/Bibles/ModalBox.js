import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";

import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "relative",
		width: 650,
		top: 100,
		left: 300,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	metaTable: {
		height: "50vh",
		overflowY: "auto",
		overflowX: "hidden",
	},
}));

const ModalBox = ({ versionName, code, metaData }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<InfoIcon onClick={handleOpen} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className={classes.paper}>
					<h2>
						{versionName} ({code})
					</h2>
					<hr />
					<div className={classes.metaTable}>
						{Object.keys(metaData).map((key) => (
							<div key={key} className="metaData">
								<span className="meta-width">{key}</span>
								{metaData[key]}
							</div>
						))}
					</div>
				</div>
			</Modal>
		</div>
	);
};
ModalBox.propTypes = {
	versionName: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	metaData: PropTypes.instanceOf(Object).isRequired,
};

export default ModalBox;
