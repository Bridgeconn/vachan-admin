import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const CommonContext = createContext();
const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(),
	},
	closeIcon: {
		float: "right",
	},
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
	metaWidth: {
		width: "200px",
		display: "inline-block",
	},
	metaDataValue: {
		width: "300px",
		display: "inline-block",
	},
	metaData: {
		"&:nth-child(even)": {
			background: "rgb(234 234 234)",
			padding: "2px",
		},
		"&:nth-child(odd)": {
			padding: "2px",
		},
	},
}));
function CommonContextProvider({ children }) {
	const [open, setOpen] = useState(false);
	const [metaData, setMetaData] = useState(null);
	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const openPop = Boolean(anchorEl);
	const id = openPop ? "simple-popover" : undefined;
	const classes = useStyles();
	const [bibleStory, setBibleStory] = useState({});
	const { isLoading, error, data } = useQuery("languageData", () =>
		fetch(`${process.env.REACT_APP_BIBLE_STORIES_URL}languages.json`).then(
			(res) => res.json()
		)
	);
	const handleClick = (event, metadata, title, codeAbb) => {
		setMetaData(metadata);
		setName(title);
		setCode(codeAbb);
		setAnchorEl(event.currentTarget);
	};

	const handleClickOpen = (metadata) => {
		setMetaData(metadata);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleClosePop = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		/*eslint spaced-comment: ["error", "always"]*/
		/*eslint spaced-comment: [2, "never"]*/
		/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]*/

		data &&
			Object.keys(data).map((language) =>
				fetch(
					`${process.env.REACT_APP_BIBLE_STORIES_URL}${language}/manifest.json`
				)
					.then((res) => res.json())
					.then((response) => {
						const temp = bibleStory;
						temp[data[language]] = response.length;
						console.log(response.length);
						setBibleStory(temp);
					})
			);
	}, [bibleStory, data]);
	return (
		<CommonContext.Provider
			value={{
				open,
				handleClickOpen,
				handleClose,
				handleClosePop,
				metaData,
				handleClick,
				anchorEl,
				id,
				openPop,
				name,
				classes,
				code,
				isLoading,
				error,
				data,
				bibleStory,
			}}
		>
			{children}
		</CommonContext.Provider>
	);
}

CommonContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default CommonContextProvider;
