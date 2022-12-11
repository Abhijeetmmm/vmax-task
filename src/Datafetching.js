import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

function DataFetching() {
  const [products, setProducts] = useState([]);
  const [dview, setView] = useState(1);
  const [perpage, setPerpage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getProducts();
  }, [perpage, itemOffset]);

  const getProducts = () => {
    axios
      .get(`https://dummyjson.com/products?limit=100`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
      });
  };

  useEffect(() => { console.log(dview)}, [dview]);

 


  const endOffset = itemOffset + perpage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / perpage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * perpage) % products.length;

    setItemOffset(newOffset);
  };

  const arr = currentItems.map((product) => {
    return (
      <>{dview ? <Grid products={product} /> : <List products={product} />}</>
    );
  });

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          marginTop: "10px",
        }}
      >
        <h1>Total - {products.length}</h1>
        <Button
          style={{ margin: "10px", width: "80px" }}
          // className={'btn '+ dview == 1 ?  'btn-success' : 'btn-primary'}
          variant={dview === 1 ? 'success' : 'primary'}
          onClick={(e) => setView(1)}
        >
          Grid
        </Button>
        <Button
          style={{ width: "80px" }}
          // className={'btn '+ dview == 0 ?  'btn-success' : 'btn-primary'}
          variant={dview === 0 ? 'success' : 'primary'}
          onClick={(e) => setView(0)}
        >
          List
        </Button>

        <Button
          style={{ margin: "10px", width: "80px" }}
          // className={'btn '+ perpage == 10 ?  'btn-success' : 'btn-primary'}
          variant={perpage === 10 ? 'success' : 'primary'}
          onClick={(e) => setPerpage(10)}
        >
          10
        </Button>

        <Button
          style={{ width: "80px" }}
          variant={perpage === 20 ? 'success' : 'primary'}
          onClick={(e) => setPerpage(20)}
        >
          20
        </Button>

        <Button
          style={{ margin: "10px", width: "80px" }}
          variant={perpage === 50 ? 'success' : 'primary'}
          onClick={(e) => setPerpage(50)}
        >
          50
        </Button>
        <div>
        <p style={{paddingTop:"15px"}}>Showing items from {itemOffset} to {endOffset}</p>
        </div>
      </div>
      <br />
      <br />
      <Row>{arr}</Row>
      <br />
      <div className="cls4">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  );
}


function List(props) {
  return (
    <>
      <Card className="polaroid1" style={{ height: "200px", margin: "5px" }}>
        <Card.Body className="cls1">
          <Card.Img
            src={props.products.thumbnail}
            alt="Card_img"
            height={170}
            className="cls2"
          />
          <Card.Body className="cls3">
            <Card.Title>{props.products.title}</Card.Title>

            <Card.Text>
              <strong> ${props.products.price}</strong>
            </Card.Text>
            <Card.Text>{props.products.description}</Card.Text>
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  );
}

function Grid(props) {
  return (
    <>
      <Col>
        <Card
          className="polaroid"
          style={{
            width: "261px",
            height: "399px",
            margin: "0px 0px 20px 0px",
          }}
        >
          <Card.Img
            src={props.products.thumbnail}
            alt="Card_img"
            height={165}
          />
          <Card.Body>
            <Card.Title>{props.products.title}</Card.Title>

            <Card.Text>
              <strong> ${props.products.price}</strong>
            </Card.Text>
            <Card.Text className="card-desc">{props.products.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default DataFetching;
