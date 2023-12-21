// actions.js
export default {
  // ... другие экшены

  /**
   * Создание нового комментария
   * @param {Object} commentData - Данные нового комментария
   * @return {Function}
   */
  createComment: (text, parentId, parentType) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comment/create-start" });
      try {
       const body = {
          text: text,
          parent: {
            _id: parentId,
            _type: parentType,
          },
        };
        const jsonStr = JSON.stringify(body);
        console.log("jsonStr", jsonStr);
        const res = await services.api.request({
          method: "POST",
          url: `/api/v1/comments?fields=id,text,dateCreate,author(profile),parent(_id,_type),isDeleted`,
          body: jsonStr,
        });

        console.log("res", res);

        dispatch({
          type: "comment/create-success",
          payload: { data: res.data.result },
        });
        console.log("Успех");
      } catch (e) {
        console.error("Облом");
        dispatch({
          type: "comment/create-error",
          payload: { error: e.message },
        });
      }
    };
  },

  getComments: (parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comment/get-start" });

      try {
        const res = await services.api.request({
          method: "GET",
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${parentId}`,
        });

        dispatch({
          type: "comment/get-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        console.error("Облом при получении комментариев", e.message);
        dispatch({
          type: "comment/get-error",
          payload: { error: e.message },
        });
      }
    };
  },
};
