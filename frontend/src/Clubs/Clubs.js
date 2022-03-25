import React, { useState, useEffect } from "react";

import "./Clubs.css";

import { Carousel, Container } from "react-bootstrap";
import FeaturedClubs from "./FeaturedClubs";
import ClubsList from "./ClubsList";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

const CLUB_CATEGORIES = [
  {
    id: "c1",
    category: "Academic Associations",
  },
  {
    id: "c2",
    category: "Cultural/International",
  },
  {
    id: "c3",
    category: "Recreational/Sports",
  },
  {
    id: "c4",
    category: "Religious",
  },
  {
    id: "c5",
    category: "Social Fraternities/Sororities",
  },
  {
    id: "c6",
    category: "Professional Societies",
  },
  {
    id: "c7",
    category: "Special Interests",
  },
];

const Clubs = () => {
  const [gotAllClubs, setGotAllClubs] = useState(false);
  const [gotFeaturedClubs, setGotFeaturedClubs] = useState(false);
  // const [gotSearchedClub, setGotSearchedClub] = useState(false);
  let gotAllData = false;

  const [allClubs, setAllClubs] = useState([]);
  const [featuredClubsList, setFeaturedClubsList] = useState([]);
  // const [searchedClub, setsearchedClub] = useState([]);

  const getData = () => {
    fetch("data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        // console.log("Featured Clubs -> ", myJson);

        const { FEATURED_CLUBS } = myJson;

        if (FEATURED_CLUBS.length > 0) {
          setFeaturedClubsList(FEATURED_CLUBS);
          setGotFeaturedClubs(true);
        }
      })
      .catch((error) => {
        console.error("err => ", error);
      });
  };

  // const getSearchedClub = () => {
  //   fetch("http://localhost:5000/api/clubs/chess_club")
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log("Searched Club ==> ", data);

  //       const { clubs } = data;

  //       if (clubs.length > 0) {
  //         setsearchedClub(clubs);
  //         setGotSearchedClub(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("err -> ", error);
  //     });
  // };

  const getAllClubs = () => {
    fetch("http://localhost:5000/api/clubs/allclubs")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log("all clubs --> ", data);
        const { clubs } = data;
        setAllClubs(clubs);
        setGotAllClubs(true);
      })
      .catch((error) => {
        console.error("err ~> ", error);
      });
  };

  //  const createClub = () => {
  //   const createThisClub = {
  //     clubname: "ShoeClub",
  //     description: "check out fancy shoes here!",
  //     symbol:
  //       "https://images.musement.com/cover/0003/90/am-pm-experience-cover_header-289357.png?lossless=false&auto=format&fit=crop&h=245&w=355",
  //     club_cat: "Recreational/Sports",
  //   };
  //   fetch("http://localhost:5000/api/clubs/", {
  //     method: "POST",
  //     body: JSON.stringify(createThisClub),
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log("do I get back something here? --> ", data);
  //     })
  //     .catch((error) => {
  //       console.error("err ~> ", error);
  //     });
  // }

  useEffect(() => {
    getData();
    // getSearchedClub();
    getAllClubs();
  }, []);

  if (gotAllClubs && gotFeaturedClubs) {
    gotAllData = true;
  }

  return (
    <React.Fragment>
      {!gotAllData && (
        <Container style={{ textAlign: "center" }}>
          <LoadingSpinner />
        </Container>
      )}
      {gotAllData && (
        <React.Fragment>
          <h4 className="featured-text">Check out Featured Clubs</h4>
          <Carousel>
            {allClubs.map((c) => (
              <Carousel.Item key={c.id} interval={1000}>
                <FeaturedClubs FEATURED_CLUBS={featuredClubsList} />
              </Carousel.Item>
            ))}
          </Carousel>
          <Container>
            <h2 className="basic-title-styles">Organizations</h2>
            <ClubsList CLUBS={allClubs} CLUB_CATEGORIES={CLUB_CATEGORIES} />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Clubs;
