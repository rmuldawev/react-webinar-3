// // reducer.js
// export const initialState = {
//     comments: [],       // массив комментариев
//     creating: false,    // флаг, указывающий на процесс создания комментария
//     createError: null,  // ошибка при создании комментария, если есть
//   }

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     // ... другие случаи

//     case 'comment/create-start':
//       return { ...state, creating: true, createError: null };

//     case 'comment/create-success':
//       return {
//         ...state,
//         creating: false,
//         createError: null,
//         comments: [...state.comments, action.payload.data],
//       };

//     case 'comment/create-error':
//       return { ...state, creating: false, createError: action.payload.error };

//     default:
//       return state;
//   }
// }

// export default reducer;

// reducer.js
export const initialState = {
    comments: [],       // массив комментариев
    creating: false,    // флаг, указывающий на процесс создания комментария
    createError: null,  // ошибка при создании комментария, если есть
    getting: false,     // флаг, указывающий на процесс получения комментариев
    getError: null,     // ошибка при получении комментариев, если есть
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      // ... другие случаи
  
      case 'comment/create-start':
        return { ...state, creating: true, createError: null };
  
      case 'comment/create-success':
        return {
          ...state,
          creating: false,
          createError: null,
          comments: [...state.comments, action.payload.data],
        };
  
      case 'comment/create-error':
        return { ...state, creating: false, createError: action.payload.error };
  
      case 'comment/get-start':
        return { ...state, getting: true, getError: null };
  
      case 'comment/get-success':
        return {
          ...state,
          getting: false,
          getError: null,
          comments: action.payload.data.items,
        };
  
      case 'comment/get-error':
        return { ...state, getting: false, getError: action.payload.error };
  
      default:
        return state;
    }
  }
  
  export default reducer;
  
