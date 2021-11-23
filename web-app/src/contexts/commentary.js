import PropTypes from 'prop-types';
import { createContext } from "react";
import { useQuery } from 'react-query';

export const Commentary = createContext();
function CommentaryProvider({children}){
    const { isLoading, error, data } = useQuery('commentariesData', () =>
    fetch(`${process.env.REACT_APP_PRODUCTION_URL}commentaries?key=${process.env.REACT_APP_COMMENTARY_KEY}`).then(res =>
      res.json()
    )
  )
    return(
        <Commentary.Provider value={{isLoading,error,data}}>
            {children}
        </Commentary.Provider>
    )
}
CommentaryProvider.propTypes = {
    children:PropTypes.node.isRequired,
}
export default CommentaryProvider