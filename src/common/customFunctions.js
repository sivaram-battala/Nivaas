import Snackbar from "react-native-snackbar";
import { colors } from "./theme";

export const SnackbarComponent = ({text,backgroundColor,height}) =>{
    return(
        Snackbar.show({text:text,duration: Snackbar.LENGTH_SHORT,backgroundColor:backgroundColor,height:height})
    )
} 