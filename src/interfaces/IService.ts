export interface IService {
    constructor(rpc: string): void
    getNameByAddress(address: string): Promise<string>;
}