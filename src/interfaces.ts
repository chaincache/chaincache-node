export interface Transaction {
    id: number;
    token: string;
    amount: number;
    gas_price: number;
    gas_used: number;
    block_number: number;
    hash: string;
    address_from: string;
    address_to: string;
    date: string;
}

export interface Meta {
    total: number;
    current_page: number;
    last_page: number;
    has_next: boolean;
}

export interface TransactionsResult {
    message: string;
    meta: Meta;
    transactions: Transaction[];
}

export interface CountResult {
    message: string;
    transactions_count: number;
}
