import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const About = () => {
    return (
        <div className="col-lg-10 text-white mx-auto pb-5">
            <div className="text-center fst-italic bg-dark text-warning m-0 py-5">
                <h1>About Us</h1>
            </div>

            <div className="d-flex flex-wrap">
                <div className="col-lg-8 col-sm-12">
                    <h1 className="text-center my-3 fw-bolder fst-italic">MotoZone&trade;</h1>
                    <p className="fs-5 mx-5 my-3">We collect bikes from all manufacturers. We sale brand new bikes at a affordable price. We also buy and sale used bikes based on it's condition. We provide aftersales service for second-hand bikes.
                    <br></br>
                    We try to collect vintage motorcycle for out valued customers.</p>
                    <div className="fs-5 mx-5 my-3">
                        <h3 className="fw-bold fst-italic">We Ensure :</h3>
                        <ul className="ms-5 fst-italic ">
                            <li>All paperworks</li>
                            <li>Engine warranty</li>
                            <li>No hidden damage</li>
                            <li>Parts from authorized dealers</li>
                            <li>Accessories from renowned companies</li>
                        </ul>
                    </div>

                </div>
                <div className="col-lg-4 col-sm-12 bg-primary border-5 rounded-3 mx-auto">
                    <Form className="mx-3 px-3 mt-3">
                        <Form.Text className="mb-1 text-dark fs-5 fw-bolder fst-italic">
                            Keep up-to-date with our newsletter !?
                            <br></br>
                            Register Now !
                        </Form.Text>
                        <Form.Group className="mt-3 mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address :</Form.Label>
                            <Form.Control type="email" placeholder="Your email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Interested topic :</Form.Label>
                            <Form.Control placeholder="Any specific interest !!" as="textarea" rows={4} />
                        </Form.Group>
                        <Button className="mb-3" variant="warning" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default About;