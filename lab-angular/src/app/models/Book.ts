export type Book = {
    url: string,
    name: string,
    isbn: string,
    authors: string[],
    numberOfPages: number,
    publisher: string,
    country: string,
    mediaType: string,
    released: string,
    characters: string[],
    povCharacters: string[],
    thumbnail_s?: string,
    thumbnail_m?: string,
    thumbnail_l?: string
}

export type BookDetails = {
    bib_key: string,
    info_url: string,
    preview: string,
    preview_url: string,
    thumbnail_url: string,
}