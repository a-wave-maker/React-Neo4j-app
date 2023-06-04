import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyStore, fetchImages } from "../../actions/actions";

import Container from "react-bootstrap/Container";
import ImageGrid from "../Image/ImageGrid";

function HomePage() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(emptyStore());
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <Container>
      <h1>Welcome!</h1>
      <ImageGrid images={images} />
      {/* <img src="https://placekitten.com/200/300" alt="test image" /> */}
    </Container>
  );
}

export default HomePage;
