import { AuthorResponse } from './AuthorsResponseDto';

export interface ProductResponseDto {
    id: string;
    name: string;
    createdAt: string;
    price: number;
    saleOff: number;
    finalPrice: number;
    image: string;
    author: AuthorResponse;
    category: AuthorResponse;
    publisher: AuthorResponse;
    distributor: AuthorResponse;
}

export interface ShortProductResponseDto {
    id: string;
    name: string;
}
