package com.example.meeting_scheduler.controllers.discovery;

import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/oslc")
public class OSLCDiscoveryController {
    private static final String OSLC_NAMESPACE = "http://open-services.net/ns/core#";

    @GetMapping(produces = {"application/rdf+xml"})
    public ResponseEntity<byte[]> getServiceProvider() {
        Model model = ModelFactory.createDefaultModel();
        model.setNsPrefix("oslc", OSLC_NAMESPACE);

        Resource serviceProvider = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "ServiceProvider"));

        Resource userService = model.createResource("http://localhost:8080/oslc/userservice");
        serviceProvider.addProperty(model.createProperty(OSLC_NAMESPACE + "service"), userService);

        Resource meetingService = model.createResource("http://localhost:8080/meetingservice");
        serviceProvider.addProperty(model.createProperty(OSLC_NAMESPACE + "service"), meetingService);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        model.write(outputStream, "RDF/XML");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/rdf+xml"));

        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
}