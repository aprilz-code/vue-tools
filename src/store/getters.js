const getters = {
  device: state => state.app.device,
  userId: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  userName: state => state.user.userName,
  currentSession: state => state.chat.currentSession

}
export default getters
