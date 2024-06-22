import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import NullImage from "../../components/Images/nullImage.png";
import { useDispatch, useSelector } from "react-redux";
import { searchArticle } from "../../store/action";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { header, noFound, searching } from "../../config/config";
import { Container, Header, card } from "./index";
import Pagination from "../Pagination";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalArticles, setTotalArticle] = useState(0);
  const { articles, loading } = useSelector((state) => state.search);
  const { query } = useParams();
  const [page,setpage]=useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchArticle(query));
  }, [query, dispatch]);

  useEffect(() => {
    setSearchQuery(query);
    setTotalArticle(articles.totalarticles);
    setpage(articles.nextPage);
  }, [query, articles]);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlepagechange=async(page)=>{
    dispatch(searchArticle(`${query}&page=${page}`));
    setTotalArticle(articles.totalarticles);
    setpage(articles.nextPage);
  }
  document.title =
    totalArticles === 0
      ? noFound
      : loading
      ? searching
      : `${capitaLize(searchQuery)} - News`;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            {totalArticles === 0 ? noFound : header(capitaLize(searchQuery))}
          </Header>
          <Container>
            <Row>
              {articles?.results?.map((element) => {
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
                        element.image_url=== null ? NullImage : element.image_url
                      }
                      urlNews={element.url}
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

export default Search;