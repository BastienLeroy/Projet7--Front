import { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = {
    isLogged: false,
    id: null,
    image_url: null,
    isMod: null,
    email: "",
    firstname: "",
    name: ""
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "SETVALUES":
            return {
                isLogged: action.isLogged,
                id: action.id,
                image_url: action.imageUrl,
                isMod: action.isMod,
                email: action.email,
                firstname: action.firstname === null ? '' : action.firstname,
                name: action.name === null ? '' : action.name
            }
        case "RESETVALUES":
            return initialState;

        default: return state;
    }
};

export const UserContextProvider = props => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {props.children}
        </UserContext.Provider>
    );
};