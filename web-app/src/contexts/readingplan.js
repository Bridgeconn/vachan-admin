import PropTypes from "prop-types";
import { createContext } from "react";
import { useQuery } from "react-query";

export const ReadingPlanContext = createContext();
function ReadingPlanContextProvider({ children }) {
  const { isLoading, error, data } = useQuery("readingData", () =>
    fetch(
      `https://raw.githubusercontent.com/Bridgeconn/vachancontentrepository/master/bible_reading_plans/manifest.json`
    ).then((res) => res.json())
  );
  return (
    <ReadingPlanContext.Provider value={{ isLoading, error, data }}>
      {children}
    </ReadingPlanContext.Provider>
  );
}
ReadingPlanContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReadingPlanContextProvider;
