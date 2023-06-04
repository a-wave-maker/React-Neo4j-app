import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";

import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const LIKED = 1;
const DISLIKED = -1;
const NEUTRAL = 0;

function Rating({ props }) {
  const imgId = props.id;
  const rating = props.rating;
  const [favd, setFavd] = useState(undefined);
  const [liked, setLiked] = useState(NEUTRAL);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const { user, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleFav() {
    if (isLoggedIn === false) {
      navigate("/login");
    } else {
      await axios.patch(`/favourite`, { userid: user.id, imgid: imgId });
      if (favd === false) {
        setFavd(true);
      } else {
        setFavd(false);
      }
    }
  }

  async function handleLike() {
    if (isLoggedIn === false) {
      navigate("/login");
    } else {
      await axios.patch(`/like`, { userid: user.id, imgid: imgId });
      if (liked === LIKED) {
        setLiked(NEUTRAL);
        setLikes(likes - 1);
      } else if (liked === NEUTRAL) {
        setLiked(LIKED);
        setLikes(likes + 1);
      } else if (liked === DISLIKED) {
        setLiked(LIKED);
        setLikes(likes + 1);
        setDislikes(dislikes - 1);
      }
    }
  }

  async function handleDislike() {
    if (isLoggedIn === false) {
      navigate("/login");
    } else {
      await axios.patch(`/dislike`, { userid: user.id, imgid: imgId });
      if (liked === LIKED) {
        setLiked(DISLIKED);
        setLikes(likes - 1);
        setDislikes(dislikes + 1);
      } else if (liked === NEUTRAL) {
        setLiked(DISLIKED);
        setDislikes(dislikes + 1);
      } else if (liked === DISLIKED) {
        setLiked(NEUTRAL);
        setDislikes(dislikes - 1);
      }
    }
  }

  function FavButton() {
    if (!isLoggedIn) {
      return (
        <Button className="fav-button" onClick={() => navigate("/login")}>
          Log in to favourite
        </Button>
      );
    } else {
      if (favd === undefined) {
        return <Button className="fav-button">Loading...</Button>;
      } else if (favd === true) {
        return (
          <Button className="fav-button" onClick={handleFav}>
            Remove favourite
          </Button>
        );
      } else {
        return (
          <Button className="fav-button" onClick={handleFav}>
            Add favourite
          </Button>
        );
      }
    }
  }

  useEffect(() => {
    async function getPersonalRating() {
      return await axios
        .post(`/image/personal`, { imgid: imgId, userid: user.id })
        .then((res) => {
          setLiked(res.data.liked);
          setFavd(res.data.favourited);
        });
    }

    if (rating !== undefined) {
      setLikes(rating.likes);
      setDislikes(rating.dislikes);
      if (isLoggedIn) {
        getPersonalRating();
      }
    }
  }, [props, imgId, isLoggedIn, rating, user]);

  return (
    <>
      <h3
        className={liked === LIKED ? "toggled" : "rating"}
        onClick={() => handleLike()}
      >
        + {likes}
      </h3>
      <h3
        className={liked === DISLIKED ? "toggled" : "rating"}
        onClick={() => handleDislike()}
      >
        - {dislikes}
      </h3>
      <FavButton />
    </>
  );
}

export default Rating;
