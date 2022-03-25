import React, { useEffect, useState } from "react";

// import UsersList from "../components/UsersList";
// import App from "../../App";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Carousel, Card, CardGroup } from "react-bootstrap";
import FeaturedClubs from "../../Clubs/FeaturedClubs";
import img1 from "../../images/club_pic.png";
import img2 from "../../images/club_symbol.png";
import event_img1 from "../../images/event_pic1.jpeg";
import event_img2 from "../../images/event_pic2.jpeg";

const CLUBS = [
  {
    clubName: "Volleyball Association",
    id: "c1",
    image: img1,
    description: "We play volleyball.",
    symbol: img2,
  },
  {
    clubName: "Accounting Society",
    id: "c2",
    image: event_img2,
    description: "Whats new in counting things...",
    symbol: img2,
  },
  {
    clubName: "Aero Mavericks",
    id: "c3",
    image: event_img1,
    description: "We are aerospace engineering student organization",
    symbol: img2,
  },
];

const FEATURED_CLUBS = [
  {
    clubName: "Volleyball Association",
    id: "c1",
    image: img1,
    description: "We play volleyball.",
    symbol: img2,
  },
  {
    clubName: "Accounting Society",
    id: "c2",
    image: event_img2,
    description: "Whats new in counting things...",
    symbol: img2,
  },
  {
    clubName: "Aero Mavericks",
    id: "c3",
    image: event_img1,
    description: "We are aerospace engineering student organization",
    symbol: img2,
  },
];

const EVENTS = [
  {
    id: "e1",
    title: "Tea with Teik: Q&A with UTAs Interim President",
    image: event_img1,
    date: "Friday, March 4 at 12:00PM CST",
    address: "Palo Duro Lounge",
    organizedBy: "UTA members Society",
  },
  {
    id: "e2",
    title: "Women in Leadership",
    image: event_img2,
    date: "Friday, March 6 at 04:00PM CST",
    address: "Central Library",
    organizedBy: "Women Coding Organization",
  },
  {
    id: "e3",
    title: "Executive Board Meeting",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "Friday, March 10 at 12:00PM CST",
    address: "University Center Campus",
    organizedBy: "Board at UTA",
  },
];

const Dashboard = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [loadedUsers, setLoadedUsers] = useState();

  const [keyword, setkeyword] = useState(null);
  const [events, setEvents] = useState([]);
  const [orgs, setOrgs] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         "http://localhost:5000/api/users"
  //       );

  //       setLoadedUsers(responseData.users);
  //     } catch (err) {}
  //   };
  //   fetchUsers();
  // }, [sendRequest]);

  const fetchSearchResult = (key) => {
    fetch("http://localhost:5000/api/search/" + key)
      .then((response) => {
        setEvents(response.body.events);
        setOrgs(response.body.orgs);

        // {events: [], orgs: [], forms: []}

        //response.body
        //[{title: "", link:"", image:""},{title: "", link:"", image:""}, {title: "", link:"", image:""}]
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {/* {!isLoading && loadedUsers && <UsersList items={loadedUsers} />} */}

      <p>{keyword}</p>
      <div className="d-flex justify-content-lg-center">
        <form className=" d-flex col-6">
          <input
            onChange={(e) => {
              setkeyword(e.target.value);
            }}
            className="form-control mr-5"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ marginRight: "10px" }}
          />
          {/* <button class="btn btn-outline-danger mt-3" type="submit" style={{height:"40px"}}>Search</button> */}
        </form>
      </div>

      <h4 className="featured-text">Check out Featured Clubs</h4>
      <Carousel>
        {CLUBS.map((c) => (
          <Carousel.Item key={c.id} interval={1000}>
            <FeaturedClubs FEATURED_CLUBS={FEATURED_CLUBS} />
          </Carousel.Item>
        ))}
      </Carousel>

      <Carousel>
        {EVENTS.map((ev) => (
          <Carousel.Item key={ev.id} interval={2500}>
            <CardGroup>
              {EVENTS.map((evt) => (
                <Card key={evt.id} style={{ margin: "1%" }}>
                  <Card.Img
                    variant="top"
                    src={evt.image}
                    style={{ height: "100%", width: "100%" }}
                  />
                  <Card.Body>
                    <Card.Title>{evt.title}</Card.Title>
                    <Card.Text>{evt.date}</Card.Text>
                    <Card.Text>{evt.address}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{evt.organizedBy}</small>
                  </Card.Footer>
                </Card>
              ))}
            </CardGroup>
          </Carousel.Item>
        ))}
      </Carousel>
    </React.Fragment>
  );
};

export default Dashboard;
