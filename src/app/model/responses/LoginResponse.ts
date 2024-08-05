import User, { Permission, Role } from "../User";

export default interface LoginResponse{
    token: string,
    permissions: Array<Permission>,
    role: Role,
    user: User
}