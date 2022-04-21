![example workflow](https://github.com/fourth-idiot/ira/actions/workflows/main.yml/badge.svg)

<!-- # Ira  -->
# [Ira: The e-learning platform](https://iraelearning.com/)
Course project for the graduate level course CEN5035 - Software Engineering.

![Ira](https://user-images.githubusercontent.com/89497585/154884309-59e3adf1-8522-4059-9978-f3013c1a2577.png)

## Team Members
* Bodke, Gauri Pandharinath ([GauriBodke](https://github.com/GauriBodke)) (Back-end)
* Hadkar, Prasad Ramakant ([prasadhbk222](https://github.com/prasadhbk222)) (Front-end)
* Lawande, Swara Jitendra ([swara9](https://github.com/swara9)) (Front-end)
* Saoji, Nikhil Mukesh ([fourth-idiot](https://github.com/fourth-idiot)) (Back-end)

## Project Topic and Motivation
Ira is an e-learning platform. Name of the platform *Ira* comes from the name of Hindu goddess Saraswati (Goddess of wisdom and knowledge). Using this platform, instructors can share their knowledge with the world without worrying about the difficulties involved in hosting a platform of their own. On the other hand, students can learn at their own pace, have lifetime access to the courses, select courses from the plethora of available options, and can gain knowledge about wide range of topics as per their interests.

## Deployment 
[Ira-eLearning Platform](https://iraelearning.com/)
* The project is deployed on AWS using AWS ec2 and nginx for reverse proxy.

## [Database](https://github.com/fourth-idiot/ira/wiki/Database-Design)
## User Roles and Corresponding Functionality:

### Guests (Without login):
* Can view course information page 
* Search a particular course using keywords
* Guests can login as student or instructor and JWT token  is generated. Also, passwords are hashed before storing into database


### Students

* Can view the courses and enroll in any course.
* Search a particular course using keywords
* Can view the list of enrolled courses and corresponding progress
* After enrollment, they can view all the course modules.
* Course modules can be either video or quiz.
* Students can submit quiz and get their scores.


### Instructors

* Can create a course. A course will have a course content made using the combination of two components (Video/Quiz)
* videos are stored on AWS s3 bucket and are fetched using presigned url.
* Can view the list of published courses and also the draft of ongoing course which is not yet published.

## [API Documentation](https://github.com/fourth-idiot/ira/wiki/REST-API-Documentation)
## Sprint Progress

| Sprint     | wiki link | Project Board   |
| :---:      |    :----:   |         :---: |
| Sprint 1   | [Sprint 1 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-1)      | [Board 1](https://github.com/fourth-idiot/ira/projects/1)|
| Sprint 2   | [Sprint 2 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-2)       |   [Board 2](https://github.com/fourth-idiot/ira/projects/1)   |
| Sprint 3   | [Sprint 3 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-2)      | [Board 3](https://github.com/fourth-idiot/ira/projects/1)     |
| Sprint 4   | [Sprint 4 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-2)      |[Board 4](https://github.com/fourth-idiot/ira/projects/4)     |
  
## Testing

### Front-End(Cypress)


### Back-End(Postman and Go Unit tests)

## Technology Stack
* Backend : Golang
* Frontend : Angular 2+
* Storage: sqlite, AWS s3 bucket
* Deployment: AWS ec2,nginx for reverse proxy
