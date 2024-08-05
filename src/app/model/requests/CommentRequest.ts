export default interface CommentRequest{
    content: string,
    userId: number,
    themaId: number,
    date?: string,
    approved: boolean,
    blocked: boolean
}