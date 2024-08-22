// import React, { createContext, useContext, useReducer } from "react";

// export const GlobalStoreContext = createContext({birthdayModalOpen: false});

// function GlobalStoreContextProvider(props) {
//     // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
//     const [store, setStore] = useState({
//         birthdayModalOpen: false
//     });

//     /*const storeReducer = (action) => {
//         const { type, payload } = action;
//         switch (type) {
//         case GlobalStoreActionType.CHANGE_LIST_NAME: {
//             return setStore({
//                 idNamePairs: payload.idNamePairs,
//                 currentList: payload.top5List,
//                 newListCounter: store.newListCounter,
//                 isListNameEditActive: false,
//                 isItemEditActive: false,
//                 listMarkedForDeletion: null
//             });
//         }
//     }*/
// }
// export default GlobalStoreContext;
// export { GlobalStoreContextProvider };