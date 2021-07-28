import PropTypes from "prop-types";
import { createContext } from "react";
import { useQuery } from "react-query";

export const DictonaryContext = createContext();
function DictonaryContextProvider({ children }) {
  const { isLoading, error, data } = useQuery("dictionariesData", () =>
    fetch(`${process.env.REACT_APP_PRODUCTION_URL}dictionaries`).then((res) =>
      res.json()
    )
  );
  return (
    <DictonaryContext.Provider value={{ isLoading, error, data }}>
      {children}
    </DictonaryContext.Provider>
  );
}

DictonaryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DictonaryContextProvider;
