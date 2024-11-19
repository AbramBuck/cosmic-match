export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`api/images/new`, {
      method: "POST",
      body: post
    });
  
    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(addPost(resPost));
    } else {
        console.log("There was an error making your post!")
    }
};