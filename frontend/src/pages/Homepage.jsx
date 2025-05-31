//hr/src/pages/Homepage.jsx 
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Colors from '../assets/images/LandScape/Colors.png';
import Purple from '../assets/images/LandScape/Purple.png';
import Lake from '../assets/images/LandScape/Lake.png';
import SunRay from '../assets/images/LandScape/SunRay.png';
import Waterfall from '../assets/images/LandScape/Waterfall.png';
import YellowFlowers from '../assets/images/LandScape/YellowFlowers.png';
import White from '../assets/images/LandScape/White.png';
import Card from "react-bootstrap/Card";
//import { Link } from "react-router-dom";

function Homepage() {
  const imageArray = [
    Colors,
    Purple,
    Lake,
    Waterfall,
    SunRay,
    YellowFlowers,
  ];

 const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  
  return (

    <div className="graphics" id="graphics">
  
      <style>
        {`
          .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          @media (min-width: 768px) {
            .bd-placeholder-img-lg {
              font-size: 3.5rem;
            }
          }
        `}
      </style>
  
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-info-subtle"
      >
        <Container fluid className="px-4">
          <Navbar.Brand href="#home" className="fw-light">
            <i className="fas fa-camera"></i><b>my</b>album.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features" className="mx-1">Features</Nav.Link>
              <Nav.Link href="#pricing" className="mx-1">Pricing</Nav.Link>
              <Nav.Link href="#pricing" className="mx-1"> <i
                        className="fas fa-cloud-upload-alt text-info"
                      ></i></Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link eventKey={2} href="#memes">
                <i className="fas fa-lock "></i> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


        {/* Background image and white mask */}
        <div>
          <section
            className="py-5 text-center"
            style={{
              position: "relative",
              backgroundImage: `url(${White})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the alpha value (0.5 in this example)
            }}
          >
            {/* White mask */}
            <div
              className="mt-3"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor:
                  "rgba(255, 255, 255, 0.75)" /* Adjust opacity as needed */,
                zIndex: -1,
              }}
            ></div>

            <div className="container-fluid">
              <div className="row justify-content-center align-items-center py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                  <h1 className="fw-light">   <i className="fas fa-camera" style={{marginRight:'4px', fontSize:
'1.75rem'  
                  }}></i><b>my</b>album.</h1>
                  <p className="lead text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maxime dolorem obcaecati voluptatem? Voluptates, nam? Eligendi voluptas repellat ipsa, alias assumenda laboriosam in quibusdam, harum quasi inventore iure vero ipsum?.
                  </p>
                  <p>
                    <a href="/" className="btn btn-info m-1 ">
                      Contact
                    </a>
                    <a href="/" className="btn btn-secondary m-1">
                      Upload
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-secondary-subtle"> 
          <div className="container py-5">    
          <h3 className="fw-light">   
            <i className="fas fa-camera mb-3"></i><b className="fw-bold">image</b>vault.</h3>
            <div className="row d-flex row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-around">
              {imageArray.map((image, index) => (
                <div className="col p-4" key={index}>
                  <div className="card shadow-sm border border-dark-subtle">
                    <img
                      src={image}
                      className="card-img-top w3-opacity w3-hover-opacity-off border border-bottom"
                      alt={` ${index + 1}`}
                      style={{ height: "200px", objectFit: "cover" }} 
                    />

                    <div className="card-body p-4">
                      <div className="card-text">
                      <p>
                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum velit ullam dolorum fugiat fuga, molestias reprehenderit recusandae tenetur beatae voluptatibus nisi?
                      </p>
                      </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center py-3">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-eye"></i> View
                          </button>

                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                          >
                            <i className="fas fa-share"></i> Share
                          </button>
                        </div>
                        <small className="text-muted w3-opacity w3-hover-opacity-off ">
                      <i
                            className="fas fa-trash"
                            style={{ fontSize: "1rem" }}
                          ></i>
                        </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
   


   <div className="bg-info-subtle py-5">
                <div className="container"> 
          <div className="row d-flex justify-content-center align-items-center g-5">
           
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h4 style={{marginLeft:'10px'}}>Create An Album</h4>

              <ol style={{fontSize:'16px'}}>
                <li style={{fontSize:'16px'}}>Click the 'Upload' button to start the process. </li>
                <li style={{fontSize:'16px'}}>
                  Once prompted, select the photos you want to include in the
                  album.
                </li>
                <li style={{fontSize:'16px'}}>
                  After that, add some information about the album. Feel free to
                  provide a brief description, including details about the
                  creator or the contents of the album. Make it informative but
                  concise, ensuring that readers can grasp the essence of the
                  images.
                </li>
              </ol>
              </div>
        
            <div className="col-sm-12 col-md-6 col-lg-6">
                <Card className="border justify-content-center rounded-50 border border-subtle">
                  <Card.Body className="text-center py-5 border">
                    <Card.Title>UPLOAD HERE</Card.Title>

                    <a href="mailto=carolwargo.dev@gmail.com">
                      {" "}
                      <i
                        className="fas fa-cloud-upload-alt text-info"
                        style={{ fontSize: "5rem" }}
                      ></i>
                    </a>
                  </Card.Body>
                </Card>
          </div>
        </div>
  </div>
  </div>


        <div className="bg-secondary-subtle py-5">
           <div className="container">
          <div className="row d-flex justify-content-center align-items-center g-5">
            <div className="col-sm-12 col-md-5 col-lg-5">
              <div className="container">
                <h4>Connect with Us</h4>
                <br></br>
                <p style={{fontSize:'14px'}}>
                  If you need inspiration from our community,{" "}
                  <a  style={{fontSize:'14px'}}href="/" className="link-info">
                    Follow us on Twitter X{" "}
                  </a>
                  , or{" "}
                  <a href="/"className="link-info" style={{fontSize:'14px'}}>
                    {" "}
                    Like us on Facebook{" "}
                  </a>
                  . For non-urgent inquiries, feel free to reach out to us via{" "}
                  <a href="mailto:" className="link-info">Email</a>. Have a concern that just can't
                  wait, contact <a href="mailto:" className="link-info">Customer Support</a>.
                </p>
             
              </div>
            </div>
                    <div className="col-sm-12 col-md-2 col-lg-2">
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5">
                <div className="container">
              <div className="row">
              <h5>CUSTOMER SERVICE</h5>
                  <div className="col-sm-6 col-md-6 col-lg-6">  
                    <ul className="list-unstyled">
                      <li>
                        <a href="/" className="link-info" style={{fontSize:'16px'}}>
                          <i className="fab fa-twitter w3-margin-right"></i>
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a href="/" className="link-info" style={{fontSize:'16px'}}>
                          <i className="fab fa-facebook w3-margin-right"></i>
                          Facebook
                        </a>
                      </li>
                    </ul>
                  </div>
                   <div className="col-sm-6 col-md-6 col-lg-6">  
                    <ul className="list-unstyled">
                      <li>
                        <a href="/" className="link-info" style={{fontSize:'16px'}}>
                          <i className="fas fa-envelope w3-margin-right"></i>
                          Email Us
                        </a>
                      </li>
                      <li>
                        <a href="/" className="link-info" style={{fontSize:'16px'}}>
                          <i className="fas fa-phone w3-margin-right"></i>
                         Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            </div>
      </div>
          <div className="text-center pb-3">
            <a href="/samples" onClick={(e) => {
  e.preventDefault();
  scrollToTop();
}}><i 
          className="fa fa-arrow-left  w3-hover-opacity" ></i>Return</a>

              </div>
        </div>
     
        <footer className="text-muted py-5 position-fixed bottom-0 start-0 w-100">
          <div className="container">
            <p className="float-end mb-1">
              <a href="Album" style={{color:'#FF385C'}}>Back to top</a>
            </p>
          </div>
        </footer>
    </div>
  );
}

export default Homepage;