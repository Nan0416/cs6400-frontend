export class LoadingProduct{
    search_text: string;
    total: number;
    old_cursor: number;
    cursor: number = 0;
    page_size: number;
    asins: string[] = [];
}