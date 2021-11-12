import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const About = () => {
    return (
        <div className="mx-auto">
            <div className="text-center fst-italic bg-dark text-white-50 m-0 py-3">
                <h2>About Us</h2>
            </div>

            <div className="col-lg-10 d-flex flex-wrap align-items-center my-5 mx-auto">
                <div className="col-lg-8 col-sm-12">
                    <h1 className="text-center my-3 fw-bolder fst-italic">MotoZone&trade;</h1>
                    <p className="fs-5 mx-5 my-3">We collect motorcycles of any company. We sale brand-new motorcycle at a cheap rate. We also buy and sale used motorcycle based on good condition. We provide aftersales service for second-hand bikes.
                    <br></br>
                    We try to collect vintage motorcycle for out valued customers.</p>
                    <div className="fs-5 mx-5 my-3">
                        <h3 className="fw-bold fst-italic">We Ensure :</h3>
                        <ul className="ms-5 fst-italic ">
                            <li>All paperworks</li>
                            <li>Engine warranty</li>
                            <li>Pristine condition</li>
                            <li>No hidden damage</li>
                            <li>Parts from authorized dealers</li>
                            <li>Accessories from renowned companies</li>
                        </ul>
                    </div>

                </div>
                <div className="col-lg-4 col-sm-12 border-5 rounded-3 mx-auto shadow-lg">
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
                            <Form.Control placeholder="Any specific interest !!" as="textarea" rows={3} />
                        </Form.Group>
                        <Button className="mb-3" variant="warning" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default About;