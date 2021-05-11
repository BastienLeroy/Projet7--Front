import { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = {
    isLogged: false,
    id: null,
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
                isMod: action.isMod,
                email: action.email,
                firstname: action.firstname,
                name: action.name
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