export class Product{
    asin: string;
    title: string;
    brand: string;
    main_cat: string;
    description: string;
    categories: string[];
    image_urls: string[];
    constructor(asin: string, title: string, brand: string, main_cat: string, description: string, categories: string[], image_urls: string[]){
        this.asin = asin;
        this.title = title;
        this.brand = brand;
        this.main_cat = main_cat;
        this.description = description;
        this.categories = categories;
        this.image_urls = image_urls;
    }
}