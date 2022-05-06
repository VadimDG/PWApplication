export class Transactions {
    trans_token: TransactionToken[];
}

export class TransactionToken {
    id: number;
    date: Date;
    username: string;
    amount: number;
    balance: number;
}