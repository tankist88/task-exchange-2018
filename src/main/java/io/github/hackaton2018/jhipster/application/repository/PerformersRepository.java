package io.github.hackaton2018.jhipster.application.repository;

import io.github.hackaton2018.jhipster.application.domain.Performers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Performers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerformersRepository extends JpaRepository<Performers, Long> {

}
