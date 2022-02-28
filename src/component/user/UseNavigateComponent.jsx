import { useNavigate } from "react-router-dom";

export function getNavigate(Component) {
    return (props) => ( <Component {...props} navigation={useNavigate()} /> );
} 