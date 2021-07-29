import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const BiBleStoryContext = createContext();
function BiBleStoryContextProvider({ children }) {
  const [bibleStory, setBibleStory] = useState({});
  const { isLoading, error, data } = useQuery("languageData", () =>
    fetch(`${process.env.REACT_APP_BIBLE_STORIES_URL}languages.json`).then(
      (res) => res.json()
    )
  );

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
            setBibleStory(temp);
          })
      );
  }, [bibleStory, data]);
  return (
    <BiBleStoryContext.Provider
      value={{ isLoading, error, data, bibleStory }}
    >
      {children}
    </BiBleStoryContext.Provider>
  );
}
BiBleStoryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BiBleStoryContextProvider;
