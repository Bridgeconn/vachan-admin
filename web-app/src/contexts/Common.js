import PropTypes from 'prop-types';
import { createContext, useState } from "react"

export const CommonContext = createContext();
function CommonContextProvider({children}) {
    const [open, setOpen] = useState(false);
    const [metaData,setMetaData]=useState({})
    const handleClickOpen = (data) => {
        setMetaData(data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <CommonContext.Provider value={{open,handleClickOpen,handleClose,metaData}}>
            {children}
        </CommonContext.Provider>
    )
}

CommonContextProvider.propTypes = {
    children:PropTypes.node.isRequired,
}
export default CommonContextProvider
