import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const InfographicsContext = createContext();
function InfographicsContextProvider({ children }) {
	const [count, setCount] = useState("");
	const { isLoading, error, data } = useQuery("languageData", () =>
		fetch(`${process.env.REACT_APP_BIBLE_STORIES_URL}languages.json`).then(
			(res) => res.json()
		)
	);

	useEffect(() => {
		fetch("https://api.autographamt.com/v1/infographics/hin")
			.then((res) => res.json())
			.then((infoData) => {
				const urls = [];
				infoData.books.forEach((element) => {
					element.infographics.forEach((item) =>
						urls.push(item.fileName)
					);
				});
				setCount(urls.length);
			});
	}, []);

	return (
		<InfographicsContext.Provider value={{ isLoading, error, data, count }}>
			{children}
		</InfographicsContext.Provider>
	);
}
InfographicsContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default InfographicsContextProvider;
