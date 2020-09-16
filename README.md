<h1 align="center">
    <img src="./design/mockups/ntucourses_logo_150_150.svg" />
    <br/>
    NTUCourses
    <br/>
    <img src="https://api.netlify.com/api/v1/badges/8f2c85b7-ec80-4d99-802c-498d2271a297/deploy-status" />
</h1>

Unofficial course planner for Nanyang Technological University.

## Data Sources

Data of this platform is scrapped from the following sources:
1. [Course content](https://wish.wis.ntu.edu.sg/webexe/owa/aus_subj_cont.main/pls/webexe/AUS_SUBJ_CONT.instruction)
1. [Class schedule](https://wish.wis.ntu.edu.sg/webexe/owa/aus_schedule.main)
1. [Exam timetable](https://wis.ntu.edu.sg/webexe/owa/exam_timetable_und.main)
1. [Venues](https://maps.ntu.edu.sg/a/search)
1. [Course vacancy](https://wish.wis.ntu.edu.sg/webexe/owa/aus_vacancy.check_vacancy)
1. [GER-PE](https://wish.wis.ntu.edu.sg/webexe/owa/aus_subj_cont2.main)

## Built with

Frontend:
- [ReactJS](https://reactjs.org/) - Frontend Framework
- [Bootstrap 4](https://getbootstrap.com) - Frontend Component

Backend:
- [Django 3.0](https://www.djangoproject.com) - Server
- [Django REST Framework](https://www.django-rest-framework.org/) - Web APIs
- [PostgreSQL](https://www.postgresql.org) - Database

Scraper:
- [Beautiful Soup 4](https://pypi.org/project/beautifulsoup4/) - Web scraper

## Functionality overview

The appplication is a course planning site called "NTUCourses". It uses a custom API for all requests. You can view the live site over at [https://ntucourses.com/](https://ntucourses.com)

__General functionality:__
- GET and display paginated lists of courses
- GET and display course details
- Bookmark courses

__The general page breakdown looks like this:__
- Home page (URL: /courses)
    - List of courses
    - Search by keyword
    - Filter options
    - Pagination
    - Back to top button
- Course details page (URL: /courses/<course-code-here)
    - Course details
    - Timetable
    - Comments

## License
MIT
