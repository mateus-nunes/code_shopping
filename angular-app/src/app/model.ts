export interface Category{

    id?: number;
    name: string;
    readonly slug?: string;
    active?: boolean;
    readonly created_at?: {
        date: string
    };
    readonly updated_at?: {
        date: string
    }

}

export interface Product{

    id?: number;
    name: string;
    description?: string;
    price?: number;
    stock?: number;
    active?: boolean;
    readonly slug?: string;
    readonly created_at?: {
        date: string
    };
    readonly updated_at?: {
        date: string
    }
    readonly deleted_at?: {
        date: string
    }

}

export interface ProductCategory {
    product: Product,
    categories: Category[]
}