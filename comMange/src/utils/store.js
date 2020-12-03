export const store = {
  state: {
    auth_list: [],
  },

  setList(list) {
    console.log(this);
    this.state.auth_list = [...list];
  },
};
