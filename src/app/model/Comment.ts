export default interface Comment{
    id:number,
    content: string,
    userId: number,
    username?: string,
    themaId: number,
    createdAt: string,
    approved: boolean,
    blocked: boolean
}