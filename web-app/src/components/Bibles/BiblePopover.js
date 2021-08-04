import React, { useContext } from "react";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import { CommonContext } from "../../contexts/Common";

const BiblePopover = ({ versionName, code, metaData }) => {
	const [open, setOpen] = React.useState(false);
	const { classes } = useContext(CommonContext);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<InfoIcon onMouseEnter={handleOpen} />
			<Popover open={open} onClose={handleClose}>
				<div className={classes.closeIcon}>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div>
				<Typography
					className={classes.typography}
					variant="h5"
					gutterBottom
				>
					{versionName} ({code})
				</Typography>
				<hr />
				<div className={classes.metaTable}>
					{metaData &&
						Object.keys(metaData).map((key) => (
							<div key={key} className={classes.metaData}>
								<span className={classes.metaWidth}>{key}</span>
								{metaData[key]}
							</div>
						))}
				</div>
			</Popover>
		</div>
	);
};
BiblePopover.propTypes = {
	versionName: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	metaData: PropTypes.instanceOf(Object),
};
BiblePopover.defaultProps = {
	metaData: null,
};
export default BiblePopover;
