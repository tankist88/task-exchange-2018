package io.github.hackaton2018.jhipster.application.repository;

import io.github.hackaton2018.jhipster.application.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
