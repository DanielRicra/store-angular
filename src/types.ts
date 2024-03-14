import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export type Options = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
};

export type Product = {
  price: number;
  name: string;
  imgUrl: string;
  rating: number;
};

export type ProductWidthId = Product & {
  id: number;
};

export type ProductList = {
  items: ProductWidthId[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
};

export type PaginationParams = {
  [key: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
};
