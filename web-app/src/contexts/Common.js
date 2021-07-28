import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { createContext, useState } from "react"

export const CommonContext = createContext();
const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(),
    },
    closeIcon:{
        float:"right"
    },
}));
function CommonContextProvider({children}) {
    const [open, setOpen] = useState(false);
    const [metaData,setMetaData]=useState(null);
    const [name,setName] = useState('');
    const [code,setCode] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const openPop = Boolean(anchorEl);
    const id = openPop ? 'simple-popover' : undefined;
    const classes = useStyles();

    
    const handleClick = (event,data,title,codeAbb) => {
      setMetaData(data)
      setName(title)
      setCode(codeAbb)
      setAnchorEl(event.currentTarget);
    };
  
    const handleClickOpen = (data) => {
        setMetaData(data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClosePop = () => {
        setAnchorEl(null);
    };
    
    return (
        <CommonContext.Provider value={{open,handleClickOpen,handleClose,handleClosePop,metaData,handleClick,anchorEl,id,openPop,name,classes,code}}>
            {children}
        </CommonContext.Provider>
    )
}

CommonContextProvider.propTypes = {
    children:PropTypes.node.isRequired,
}
export default CommonContextProvider
