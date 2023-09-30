export interface CreateProductRequestDto {
    name: string;
    images: string[];
    author: string;
    publisher: string;
    category: string;
    distributor: string;
    price: number;
    finalPrice: number;
    saleOff: number;
    description: string;
    statistics: string;
    subId: string;
}
