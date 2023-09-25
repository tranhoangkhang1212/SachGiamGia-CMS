import { EFilterData } from '@/constants/FilterData.enum';

export interface GetProductOptionRequestDto {
    type: EFilterData;
    values: [];
}

export interface GetProductRequestDto {
    ids?: string[];
    name?: string;
    options: GetProductOptionRequestDto[];
}
