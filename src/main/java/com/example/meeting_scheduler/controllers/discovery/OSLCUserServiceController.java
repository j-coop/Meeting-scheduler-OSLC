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
@RequestMapping("/oslc/userservice")
public class OSLCUserServiceController {
    private static final String OSLC_NAMESPACE = "http://open-services.net/ns/core#";
    private static final String CUSTOM_NAMESPACE = "http://localhost:8080/userservice#";

    @GetMapping(produces = {"application/rdf+xml"})
    public ResponseEntity<byte[]> getUserService() {
        Model model = ModelFactory.createDefaultModel();
        model.setNsPrefix("oslc", OSLC_NAMESPACE);
        model.setNsPrefix("user", CUSTOM_NAMESPACE);

        Resource userService = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "ServiceProvider"))
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "title"), "User Service");

        Resource endpoints = model.createResource()
                .addProperty(RDF.type, model.createResource(CUSTOM_NAMESPACE + "Endpoints"))
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getUsers"), "/users")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getUserById"), "/users/id/{id}")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getUserByLogin"), "/users/login/{login}")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getUserByEmail"), "/users/email/{email}")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "checkLogin"), "/users/login")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "addUser"), "/users")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "updateUser"), "/users/{id}");
        userService.addProperty(model.createProperty(CUSTOM_NAMESPACE + "endpoints"), endpoints);

        Resource creationFactory = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "CreationFactory"))
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "targetEndpoint"), "/users");

        Resource resourceShape = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "ResourceShape"));
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "nickname"), "user app nickname");
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "fullName"), "user full name");
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "email"), "user@example.com");
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "timezone"), "user's UTC timezone");
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "password"), "hashedPassword");
        creationFactory.addProperty(model.createProperty(OSLC_NAMESPACE + "resourceShape"), resourceShape);

        userService.addProperty(model.createProperty(OSLC_NAMESPACE + "creationFactory"), creationFactory);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        model.write(outputStream, "RDF/XML");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/rdf+xml"));

        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
}