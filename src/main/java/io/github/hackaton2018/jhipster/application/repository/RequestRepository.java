package io.github.hackaton2018.jhipster.application.repository;

import io.github.hackaton2018.jhipster.application.domain.Request;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

}
