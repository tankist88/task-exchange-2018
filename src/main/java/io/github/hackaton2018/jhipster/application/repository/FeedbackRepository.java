package io.github.hackaton2018.jhipster.application.repository;

import io.github.hackaton2018.jhipster.application.domain.Feedback;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Feedback entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
