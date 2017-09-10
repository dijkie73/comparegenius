export class Category {
    $key: string;
    id: number;
    name: string;
    urlName: string;
    active: boolean = true;
    parentKey: string;
    icon: string;
}

export class Product {
    $key: string;
    id: number;
    title: string;
    brand: string;
    shortDescription: string;
    urlName: string;
    categoryKey : string;
    featuredImage: string;
}
