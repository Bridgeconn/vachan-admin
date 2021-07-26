import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CommentIcon from "@material-ui/icons/Comment";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import EventIcon from "@material-ui/icons/Event";
import ImageIcon from "@material-ui/icons/Image";
import VideocamIcon from "@material-ui/icons/Videocam";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import FormatShapesIcon from "@material-ui/icons/FormatShapes";
import CommentaryProvider from "../contexts/commentary";
import Data from "./Commentary/data";
import BibleContextProvider from "../contexts/BibleContext";
import Bibles from "./Bibles/Bibles";

function TabPanel(props) {
	/* eslint-disable react/jsx-props-no-spreading */
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
	index: PropTypes.node.isRequired,
	value: PropTypes.node.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
	},
	tabs: {
		borderRight: `2px solid ${theme.palette.divider}`,
	},
}));

export default function VerticalTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				orientation="vertical"
				value={value}
				onChange={handleChange}
				className={classes.tabs}
			>
				<Tab
					icon={<ImportContactsIcon />}
					label="Bibles"
					{...a11yProps(0)}
				/>
				<Tab
					icon={<CommentIcon />}
					label="Commentaries"
					{...a11yProps(1)}
				/>
				<Tab
					icon={<FormatShapesIcon />}
					label="Dictionaries"
					{...a11yProps(2)}
				/>
				<Tab
					icon={<ImageIcon />}
					label="Infographics"
					{...a11yProps(3)}
				/>
				<Tab icon={<VideocamIcon />} label="Videos" {...a11yProps(4)} />
				<Tab
					icon={<LocalLibraryIcon />}
					label="Bible Stories"
					{...a11yProps(5)}
				/>
				<Tab
					icon={<EventIcon />}
					label="Reading Plans "
					{...a11yProps(6)}
				/>
			</Tabs>
			<TabPanel value={value} index={0}>
				<BibleContextProvider>
					<h1>Bibles</h1>
					<Bibles />
				</BibleContextProvider>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<CommentaryProvider>
					<Data />
				</CommentaryProvider>
			</TabPanel>
			<TabPanel value={value} index={2}>
				Dictionaries
			</TabPanel>
			<TabPanel value={value} index={3}>
				Infographics
			</TabPanel>
			<TabPanel value={value} index={4}>
				Videos
			</TabPanel>
			<TabPanel value={value} index={5}>
				Bible Stories
			</TabPanel>
			<TabPanel value={value} index={6}>
				Reading Plans
			</TabPanel>
		</div>
	);
}
