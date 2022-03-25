export interface Course{
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string,
    title: string,
    description: string,
    isPublished: boolean,
    publishedAt: string,
    instructorId: string,
}