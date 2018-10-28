package io.github.hackaton2018.jhipster.application.repository;

import io.github.hackaton2018.jhipster.application.domain.Respond;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Respond entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RespondRepository extends JpaRepository<Respond, Long> {

}
