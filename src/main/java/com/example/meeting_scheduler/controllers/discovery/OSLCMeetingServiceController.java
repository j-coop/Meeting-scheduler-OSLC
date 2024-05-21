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
@RequestMapping("/oslc/meetingservice")
public class OSLCMeetingServiceController {
    private static final String OSLC_NAMESPACE = "http://open-services.net/ns/core#";
    private static final String CUSTOM_NAMESPACE = "http://localhost:8080/meetingservice#";

    @GetMapping(produces = {"application/rdf+xml"})
    public ResponseEntity<byte[]> getMeetingService() {
        Model model = ModelFactory.createDefaultModel();
        model.setNsPrefix("oslc", OSLC_NAMESPACE);
        model.setNsPrefix("meeting", CUSTOM_NAMESPACE);

        Resource meetingService = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "ServiceProvider"))
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "title"), "Meeting Service");

        Resource endpoints = model.createResource()
                .addProperty(RDF.type, model.createResource(CUSTOM_NAMESPACE + "Endpoints"))
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getMeetingById"), "/meetings/{id}")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "cancelMeeting"), "/meetings/{id}/cancel")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "scheduleMeeting"), "/meetings/{id}/schedule")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "markMeetingCompleted"), "/meetings/{id}/complete")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getMeetingsByUser"), "/meetings/user/{login}")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getMeetingProposals"), "/meetings/{id}/proposals")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "getMeetingParticipations"), "/meetings/{id}/participations")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "addMeeting"), "/meetings")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "addMeetingProposal"), "/meetings/{id}/proposals")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "addMeetingParticipation"), "/meetings/{id}/participations")
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "changeParticipationStatus"), "/meetings/{meetingId}/participations/{participationId}/status");
        meetingService.addProperty(model.createProperty(CUSTOM_NAMESPACE + "endpoints"), endpoints);

        Resource creationFactory = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "CreationFactory"))
                .addProperty(model.createProperty(CUSTOM_NAMESPACE + "targetEndpoint"), "/meetings");

        Resource resourceShape = model.createResource()
                .addProperty(RDF.type, model.createResource(OSLC_NAMESPACE + "ResourceShape"));
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "title"), "meeting title/name");
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "description"), "description of the meeting");
        resourceShape.addProperty(model.createProperty(CUSTOM_NAMESPACE + "organiser"), "organiser's user id");
        creationFactory.addProperty(model.createProperty(OSLC_NAMESPACE + "resourceShape"), resourceShape);

        meetingService.addProperty(model.createProperty(OSLC_NAMESPACE + "creationFactory"), creationFactory);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        model.write(outputStream, "RDF/XML");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/rdf+xml"));

        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
}