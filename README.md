# Univent
<img src="images/event_pic1.jpeg" width= "800" >

<b>WHAT IS UNIVENT/MERNSTACK? </b>

  <b> Brief Project Outline: </b>
  
  Univent is a MERN stack webapplication which allows UT-Arlington students and faculty the ability to view, create, and join organizations on campus.
  
  <b>Detailed Project Outline: </b>
  
  Our project will be a web application for facilitating the organization and networking requirements that many UTA campus clubs have. There will be multiple stakeholders
  including administrators of said UTA organizations such as the president of the club, students who want to sign up and become members of the organizations, and an overall
  administrator of the networking site so that control can be handed between students as organizations administrative staff graduate and move on from UTA.
  The club administrators will be able to post events, manage members and create forms that will facilitate data entry. These forms will be for the purpose of signing up for
  events or keeping track of payment for given services that the organization may provide. Payment processing is not under the scope of this project. Club administrators will  
  also be able to make posts to the club's page to gather comments from club members such as what time would be best to meet, or which event has the most interest. These posts
  would be open for commenting. The students will be presented with a feed containing events that are upcoming from given clubs, and the ability to click on a club’s link to 
  visit and get information about that club. They will be able to fill out an application to join a club as well as sign up to partake in events that the club offers if they are
  members of a given club. They will also be able to take part in any opinion surveys and comment on posts that the administrators of clubs were to make. In addition, clubs that
  the students are members of would-be prioritized in their feed. Also, posts that are specific to the club that they are a member of would show up in their feed which would not
  show up if they were not members. UTA administrators will have the ability to make new clubs, set new club administrators, and see all posts. 
  There are no private posts that UTA administrators would be unable to see. The UTA administrator feed will contain all posts from every club sorted by clubs with the most
  active members. They will also have the ability to remove any student from any club and pass the responsibility of club president or any other club administrative position on
  to a different student. For our tech stack, we decided to go with the MERN stack. We will use React as well as some CSS and possible animations for the front end. We will use
  Node/Express for the back end, and MongoDB for our database needs. For the purpose of maintaining system consistency, we will use docker containers for development. When
  hosting we are going to use AWS ECR for container registry with ECS tasks to host and deploy our docker container.

  
  <b>What is the Mern Stack?</b>
  
  MongoDB: NoSQL Database which stores "Documents" in "Collections" (instead of "records: in "tables" as in SQL). Stores application data(users. products...) no enforcement of       schema or relation(can still build one if needed), better performance.
  
  Express: A node framework which simplifies writing server-side code and logic. Based on Node, but offers same functionalities and more. Middle-ware based, funnel requests         through functions, Includes routing view rendering and more(simplifies Node.js).
  
  React: a client-side browser library which allows you to build highly reactive user interfaces (FrontEnd). Renders UI with Dynamic data, Handles user input, Comunicates with       backend. Browser side javascript Library for building user interfaces. Uses lots of components to build a program
  
  Node: a server-side runtime(javascript on serverside alternative to PHP). Listen to requests and send responses, execute server-side logic, interact with database and files(used 
  alongside express.) Allows us to run javascript outside the browser.

  Ajax requests and responses from client side React to backend server without reloading the page on the client(data: JSON format)
  
  Frontend
  Everything is on a single page rerendered with react-router-dom when the user enters a new url(goes to a new page). State management(redux and hooks) to manage states of certain   parts of the webpage.
  
  Backend
  Decoupled ends, backend is built as an API(things exposure certain entry points which other things can use). Clearly defined entry points so other users can use them. In Univent   we use REST API(request path+ httpmethod(="endpoint") identify a resource/action on the server, RESTApi is Stateless, and decoupled from the frontend(use with any front end). 
  From your react app you send requests to node express app, then node express server which talks to database.
  
  React Components are functions, that return JSX, react element calls, or javascript class with render method.
  React rerenders the UI when you update the state of the component


<b>HOW TO RUN THE WEB APPLICATION LOCALLY</b>

  1) Download visual studio code
  2) Pull the main github repository to a folder
  3) Open the folder where you put the web application code in visual studio code
  4) cd into the front end and in a separate terminal cd into the backend
  5) Run "npm install" in both the backend and frontend terminals
  6) run "npm start" from the backend and frontend terminals
  7) The web application should be running locally on your device


<b>UML Diagrams: </b>

Use Case Diagram and Class Diagram

<img src="images/usecase diagram.png" width= "500" > <img src="images/classdiagram.png" width= "467" >

