import PropTypes from "prop-types";
import { createContext } from "react";
import { useQuery } from "react-query";

export const BibleContext = createContext();

function BibleContextProvider({ children }) {
	const { isLoading, error, data } = useQuery("biblesData", () =>
		fetch(`${process.env.REACT_APP_PRODUCTION_URL}bibles`).then((res) =>
			res.json()
		)
	);

	return (
		<BibleContext.Provider value={{ isLoading, error, data }}>
			{children}
		</BibleContext.Provider>
	);
}
BibleContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default BibleContextProvider;
