const getters = {
  userId: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname

}
export default getters
