import { useContext } from "react";
import { CommonContext } from "../contexts/Common";

function MetaData() {
	const { metaData, classes } = useContext(CommonContext);
	if (metaData === null) {
		return "";
	}
	return (
		<div>
			{metaData &&
				Object.keys(metaData).map((key) => (
					<div key={key} className={classes.metaData}>
						<span className={classes.metaWidth}>{key}</span>
						<span className={classes.metaDataValue}>
							{metaData[key]}
						</span>
					</div>
				))}
		</div>
	);
}
export default MetaData;
