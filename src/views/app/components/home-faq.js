import React from 'react'
import { Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function HomeFaq() {
  return (
  <section>
              <Container>
                  <h3 className="text-center mb-5">FAQ's</h3>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>What services are offered at A.G Diagnostics Centre in Pune?</Accordion.Header>
                    <Accordion.Body>
A.G Diagnostics offers a comprehensive range of health checkups, including blood tests, urine tests, pathology, radiology, and preventive health packages. We are known as one of the best diagnostic centres in Pune for accurate quality results and professional care.                    </Accordion.Body>
                  </Accordion.Item>
            
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Can I book a blood test home collection?</Accordion.Header>
                    <Accordion.Body>
Yes, A.G Diagnostics provides blood test home collection services across Pune (including PCMC)  for your convenience. Simply book your test online or call us, and our trained phlebotomists will collect your sample at your doorstep safely and hygienically.                    </Accordion.Body>
                  </Accordion.Item>
            
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>What types of health checkup packages are available?</Accordion.Header>
                    <Accordion.Body>
We offer a variety of packages including basic health checkups, full-body checkups, senior citizen packages, and specialized packages like thyroid, diabetes, and kidney profiles.
                   </Accordion.Body>
                  </Accordion.Item>
            
                   <Accordion.Item eventKey="3">
                    <Accordion.Header>Is it safe to get a blood test done at home?</Accordion.Header>
                    <Accordion.Body>
Yes, totally safe! Our phlebotomists follow strict hygiene protocols,  and use sterilized equipment. 
</Accordion.Body>
                  </Accordion.Item>
            
            
                </Accordion>
              </Container>
            
              
            </section>
  )
}
