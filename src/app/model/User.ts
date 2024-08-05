export default interface User{
    id:number,
    username:string,
    email:string,
    role:Role,
    blocked:boolean,
    approved: boolean,
    active: boolean,
    permissions:Array<Permission>
}

export interface Role{
    id: number,
    name: string
}

export interface Permission{
    name:string,
    id:number
}