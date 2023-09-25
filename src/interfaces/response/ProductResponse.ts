import { AuthorsResponseDto } from './AuthorsResponseDto';

export interface ProductResponseDto {
    id: string;
    name: string;
    createdAt: string;
    price: number;
    saleOff: number;
    finalPrice: number;
    image: string;
    author: AuthorsResponseDto;
    category: AuthorsResponseDto;
    publisher: AuthorsResponseDto;
    distributor: AuthorsResponseDto;
}
