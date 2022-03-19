import { Course } from '../../app/models/Course';

export const allCourses: Course[] =  [
    {
        "CreatedAt": "03-10-2022",
        "UpdatedAt" : "03-18-2022",
        "DeletedAt" : "",
        "title": "Android Development",
        "description": "mobile app development",
        "isPublished": false,
        "publishedAt": "",
        "instructorId": "1234"
    },
    {
        "CreatedAt": "03-10-2022",
        "UpdatedAt" : "03-18-2022",
        "DeletedAt" : "",
        "title": "Spring Boot",
        "description": "Java app development",
        "isPublished": false,
        "publishedAt": "",
        "instructorId": "521"
    },
    {
        "CreatedAt": "01-10-2022",
        "UpdatedAt" : "02-14-2022",
        "DeletedAt" : "",
        "title": "ML for Beginners",
        "description": "Machine Learning Using Tensor Flow",
        "isPublished": true,
        "publishedAt": "03-017-2022",
        "instructorId": "486"
    }
]

CreatedAt: string,
UpdatedAt: string,
DeletedAt: string,
title: string,
description: string,
isPublished: boolean,
publishedAt: string,
instructorId: string,