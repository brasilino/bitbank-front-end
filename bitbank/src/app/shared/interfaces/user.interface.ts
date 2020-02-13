export interface User {
    token: string;
    body: {
        _id: string;
        email: string;
        fullName: string;
        cpf: string;
        balance: number;
        numberAccount: string;
    }
}