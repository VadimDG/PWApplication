export interface ITransferDto {
    senderId: number;
    receiverId: number;
    date?: Date;
    amount: number;
}