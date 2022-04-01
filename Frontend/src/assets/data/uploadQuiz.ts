export const uploadQuiz = {
    "ID": 13,
    "CreatedAt": "2022-03-29T12:41:30.253096172-04:00",
    "UpdatedAt": "2022-03-29T12:41:30.253096172-04:00",
    "DeletedAt": null,
    "title": "Module 1",
    "type": "quiz",
    "isPrivate": true,
    "courseId": 1,
    "Video": {
        "ID": 0,
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "DeletedAt": null,
        "url": "",
        "moduleId": 0
    },
    "Quiz": {
        "ID": 12,
        "CreatedAt": "2022-03-29T12:41:31.153142728-04:00",
        "UpdatedAt": "2022-03-29T12:41:31.153142728-04:00",
        "DeletedAt": null,
        "moduleId": 13,
        "numOfQuestions": 2,
        "questions": [
            {
                "ID": 15,
                "CreatedAt": "2022-03-29T12:41:31.22327997-04:00",
                "UpdatedAt": "2022-03-29T12:41:31.22327997-04:00",
                "DeletedAt": null,
                "quizId": 12,
                "content": "what is your name",
                "options": [
                    {
                        "ID": 25,
                        "CreatedAt": "2022-03-29T12:41:31.293017553-04:00",
                        "UpdatedAt": "2022-03-29T12:41:31.293017553-04:00",
                        "DeletedAt": null,
                        "questionId": 15,
                        "content": "option 1 Nikhil",
                        "isCorrect": false
                    },
                    {
                        "ID": 26,
                        "CreatedAt": "2022-03-29T12:41:31.362770571-04:00",
                        "UpdatedAt": "2022-03-29T12:41:31.362770571-04:00",
                        "DeletedAt": null,
                        "questionId": 15,
                        "content": "option 2 Prasad",
                        "isCorrect": true
                    }
                ]
            },
            {
                "ID": 16,
                "CreatedAt": "2022-03-29T12:41:31.428961561-04:00",
                "UpdatedAt": "2022-03-29T12:41:31.428961561-04:00",
                "DeletedAt": null,
                "quizId": 12,
                "content": "Which course you want to take",
                "options": [
                    {
                        "ID": 27,
                        "CreatedAt": "2022-03-29T12:41:31.49818678-04:00",
                        "UpdatedAt": "2022-03-29T12:41:31.49818678-04:00",
                        "DeletedAt": null,
                        "questionId": 16,
                        "content": "option 1 AOA",
                        "isCorrect": true
                    },
                    {
                        "ID": 28,
                        "CreatedAt": "2022-03-29T12:41:31.568019588-04:00",
                        "UpdatedAt": "2022-03-29T12:41:31.568019588-04:00",
                        "DeletedAt": null,
                        "questionId": 16,
                        "content": "option 2 NN",
                        "isCorrect": false
                    }
                ]
            }
        ]
    }
}