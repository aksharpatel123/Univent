import React from "react";

// import Card from "../shared/components/UIElements/Card";
// import Button from "../shared/components/FormElements/Button";
import event_img1 from "../images/event_pic1.jpeg";
import event_img2 from "../images/event_pic2.jpeg";
import "./EventList.css";

import {
  Carousel,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
  Card,
  CardGroup,
  Button,
} from "react-bootstrap";

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

const EventList = (props) => {
  if (EVENTS.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  //goes through every place we have and renders a <PlaceItem> for every place
  return (
    <React.Fragment>
      <div>
        <h2 className="basic-title-styles">EVENTS</h2>
        <Row>
          <Col md={3}>
            <InputGroup
              className="mb-3"
              style={{ height: "10%", margin: "1%" }}
            >
              <FormControl
                placeholder="Search Events"
                aria-label="Search Events"
                aria-describedby="basic-addon2"
                style={{ height: "100%", width: "70%", margin: "1%" }}
              />

              <Button
                type="submit"
                style={{ height: "100%", width: "25%", margin: "1%" }}
              >
                SEARCH
              </Button>
              <div
                key={"default-radio"}
                className="mb-3"
                style={{ margin: "1rem" }}
              >
                <Form.Check type="radio" id="weekend" label="Weekend" />
                <Form.Check type="radio" id="tomorrow" label="Tomorrow" />
              </div>
            </InputGroup>
          </Col>
          <Col md={9}>
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
                          <small className="text-muted">
                            {evt.organizedBy}
                          </small>
                        </Card.Footer>
                      </Card>
                    ))}
                  </CardGroup>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default EventList;
