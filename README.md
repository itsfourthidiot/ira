![example workflow](https://github.com/fourth-idiot/ira/actions/workflows/main.yml/badge.svg)

# Ira: The e-learning platform [[Link](https://iraelearning.com/)]
Course project for the graduate level course CEN5035 - Software Engineering.

![Ira](https://user-images.githubusercontent.com/89497585/154884309-59e3adf1-8522-4059-9978-f3013c1a2577.png)

## Team Members
| Name | Team | GitHub Username |
| :---: | :----: | :---: |
| Bodke, Gauri Pandharinath | Backend | [GauriBodke](https://github.com/GauriBodke) |
| Hadkar, Prasad Ramakant | Frontend | [prasadhbk222](https://github.com/prasadhbk222) |
| Lawande, Swara Jitendra | Frontend | [swara9](https://github.com/swara9) |
| Saoji, Nikhil Mukesh | Backend | [fourth-idiot](https://github.com/fourth-idiot) |

## Project Topic and Motivation
Ira is an e-learning platform. Name of the platform *Ira* comes from the name of Hindu goddess Saraswati (Goddess of wisdom and knowledge). Using this platform, instructors can share their knowledge with the world without worrying about the difficulties involved in hosting a platform of their own. On the other hand, students can learn at their own pace, have lifetime access to the courses, select courses from the plethora of available options, and can gain knowledge about wide range of topics as per their interests.

## Deployment:
The project has been deployed at the following link: [https://iraelearning.com/](https://iraelearning.com/). It is deployed on AWS EC2 where NGINX is used for reverse proxy.

## Application Description (User Roles and Corresponding Functionality):
### Guests (Without login):
* Can view course information page 
* Search a particular course using keywords
* Guests can login as student or instructor and JWT token  is generated. Also, passwords are hashed before storing into database

### Students:
* Can view the courses and enroll in any course.
* Search a particular course using keywords
* Can view the list of enrolled courses and corresponding progress
* After enrollment, they can view all the course modules.
* Course modules can be either video or quiz.
* Students can submit quiz and get their scores.

### Instructors:
* Can create a course. A course will have a course content made using the combination of two components (Video/Quiz)
* videos are stored on AWS s3 bucket and are fetched using presigned url.
* Can view the list of published courses and also the draft of ongoing course which is not yet published.

## Database Design [[Link](https://github.com/fourth-idiot/ira/wiki/Database-Design)]

## API Documentation [[Link](https://github.com/fourth-idiot/ira/wiki/REST-API-Documentation)]

## Sprint Progress:
| Sprint     | Wiki link | Project board   |
| :---:      |    :----:   |         :---: |
| Sprint 1   | [Sprint 1 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-1)      | [Board 1](https://github.com/fourth-idiot/ira/projects/1)|
| Sprint 2   | [Sprint 2 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-2)       |   [Board 2](https://github.com/fourth-idiot/ira/projects/2)   |
| Sprint 3   | [Sprint 3 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-3)      | [Board 3](https://github.com/fourth-idiot/ira/projects/3)     |
| Sprint 4   | [Sprint 4 Readme](https://github.com/fourth-idiot/ira/wiki/Sprint-4)      |[Board 4](https://github.com/fourth-idiot/ira/projects/4)     |
  
## Demo videos:
### Application functionality testing:
### Frontend Cypress testing:
### Backend Unit and API testing:

## Technology Stack
* Backend : Golang, gin-gonic, GORM
* Frontend : Angular 2+
* Storage: SQLite, AWS S3
* Deployment: GitHub Actions, Newman (Postman CLI tool), AWS CodeDeploy, AWS EC2, NGINX
