export interface ITransactionToken {
    trans_token: ITransaction[]
}
export interface ITransaction {
    id: string;
    date: Date;
    username: string;
    amount: number;
    balance: number;
}