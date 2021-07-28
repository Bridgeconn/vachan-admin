import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const VideoContext = createContext();

function VideoContextProvider({ children }) {
	const [videos, setVideos] = useState([]);
	function countUnique(iterable) {
		return new Set(iterable).size;
	}

	useEffect(() => {
		fetch("https://api.autographamt.com/v1/videos ")
			.then((response) => response.json())
			.then((data) => {
				const videoCounts = {};
				data.forEach((language) => {
					const urls = [];
					// console.log(language);
					Object.entries(language.books).forEach((book) => {
						// console.log(book[1]);
						book[1].forEach((video) => {
							// console.log(video);
							urls.push(video.url);
						});
					});
					// console.log(urls);
					// console.log(countUnique(urls));
					videoCounts[language.language.name] = countUnique(urls);
				});
				setVideos(videoCounts);
			});
	}, []);

	return (
		<VideoContext.Provider value={{ videos }}>
			{children}
		</VideoContext.Provider>
	);
}
VideoContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default VideoContextProvider;
