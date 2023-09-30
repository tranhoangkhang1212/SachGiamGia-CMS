import { NextPageContext } from 'next';

export interface ContextWithParams extends NextPageContext {
    query: {
        id?: string;
        slug: string;
        subSlug?: string;
    };
}
