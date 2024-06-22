import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";
import Pagination from "../Pagination";


function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setpage]=useState(0);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;

  const updatenews = async () => {
    try {
      const response = await axios.get(endpointPath(country, category));
      setLoading(true);
      const parsedData = response.data;
      setArticles(parsedData.results);
      setpage(parsedData.nextPage);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlepagechange=async(page)=>{
    try {
      const response = await axios.get(`${endpointPath(country, category)}&page=${page}`);
      setLoading(true);
      const parsedData = response.data;
      setArticles(parsedData.results);
      setpage(parsedData.nextPage);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          
          <Container>
            <Row>
              {articles.map((element) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.pubDate}
                      channel={element.source_id}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.image_url === null ? NullImage : element.image_url
                      }
                      urlNews={element.link}
                    />
                  </Col>
                );
              })}
            </Row>
            <Pagination page={page} onPageChange={handlepagechange}/>
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;