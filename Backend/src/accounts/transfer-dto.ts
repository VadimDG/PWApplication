export interface ITransferDto {
    senderId: number;
    receiverName: string;
    date?: Date;
    amount: number;
}