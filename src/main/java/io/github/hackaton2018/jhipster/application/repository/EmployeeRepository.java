package io.github.hackaton2018.jhipster.application.repository;

import io.github.hackaton2018.jhipster.application.domain.Employee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Employee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
