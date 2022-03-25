import React from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";

// import symbol from "../images/club_symbol.png";

const ClubsList = (props) => {
  // Example POST method implementation:
  async function postData() {
    const createThisClub = {
      clubname: "PhoneClub",
      description: "check out fancy shoes here!",
      symbol:
        "https://images.musement.com/cover/0003/90/am-pm-experience-cover_header-289357.png?lossless=false&auto=format&fit=crop&h=245&w=355",
      club_cat: "Recreational/Sports",
    };

    const response = await fetch("http://localhost:5000/api/clubs/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(createThisClub),
    });
    return response.json();
  }

  return (
    <Row>
      <Col md={9}>
        {props.CLUBS.map((cb) => (
          <Card key={cb.id} style={{ margin: "1%", height: "10rem" }}>
            <Card.Header
              style={{
                fontWeight: "500",
                fontSize: 20,
                fontFamily: "Copperplate",
              }}
            >
              {cb.clubname.replace("_", " ")}
            </Card.Header>
            <Card.Body style={{ margin: "0%" }}>
              <Row>
                <Col md={2}>
                  <Card.Img
                    src={cb.image}
                    style={{
                      height: "5.5rem",
                      width: "5.5rem",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  />
                </Col>
                <Col md={8}>
                  <p style={{ textAlign: "left", paddingTop: "4.5%" }}>
                    {cb.description}
                  </p>
                </Col>
                <Col md={2}>
                  <Button variant="primary" className="mt-4">
                    More Detail
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Col>
      <Col md={3}>
        <InputGroup className="mb-3" style={{ height: "13%", margin: "1%" }}>
          <FormControl
            placeholder="Search Clubs"
            aria-label="Search Clubs"
            aria-describedby="basic-addon2"
            style={{ height: "60%", width: "70%", margin: "1%" }}
          />

          <Button
            type="submit"
            style={{ height: "60%", width: "25%", margin: "1%" }}
          >
            SEARCH
          </Button>
          <Container
            style={{
              height: "13%",
              margin: "1%",
              marginTop: "5%",
              padding: "1%",
            }}
          >
            <h5>Category</h5>
            <DropdownButton
              variant="outline-secondary"
              title="   Category   "
              id="input-group-dropdown-1"
              style={{
                width: "110%",
              }}
            >
              {props.CLUB_CATEGORIES.map((categ) => (
                <Dropdown.Item key={categ.id} href="#">
                  {categ.category}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <Button
              variant="outline-success"
              style={{ margin: "5rem" }}
              className="mt-4"
              onClick={postData}
            >
              Create Club
            </Button>
          </Container>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default ClubsList;
