const apiurl = 'http://localhost:8080';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/auth/login`,
    register: `${apiurl}/auth/register`,
    sendReactivation: `${apiurl}/auth/activate`
  },
  UserEndpoint: {
    getAll: `${apiurl}/user`,
    getById: `${apiurl}/user/id/`,
    block: `${apiurl}/user/block/`,
    approve: `${apiurl}/user/approve/`,
    addPermission: `${apiurl}/user/`,
    getPermissions: `${apiurl}/user/permission`,
    removePermission: `${apiurl}/user/`
  },
  CommentEndpoint: {
    getAllByThema: `${apiurl}/forum/comment/thema/`,
    getLast: `${apiurl}/forum/comments/thema/`,
    block: `${apiurl}/forum/comment/block/`,
    approve: `${apiurl}/forum/comment/approve/`,
    add: `${apiurl}/forum/comment`
  }
}