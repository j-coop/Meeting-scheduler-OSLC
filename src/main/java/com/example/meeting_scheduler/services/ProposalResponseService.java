package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.repositories.ProposalResponseRepository;

public class ProposalResponseService {
    private final ProposalResponseRepository proposalResponseRepository;

    public ProposalResponseService(ProposalResponseRepository proposalResponseRepository) {
        this.proposalResponseRepository = proposalResponseRepository;
    }
}
