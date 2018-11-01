import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Employee [<b>{employeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="role">Role</span>
            </dt>
            <dd>{employeeEntity.role}</dd>
            <dt>
              <span id="commandRole">Command Role</span>
            </dt>
            <dd>{employeeEntity.commandRole}</dd>
            <dt>
              <span id="username">Username</span>
            </dt>
            <dd>{employeeEntity.username}</dd>
            <dt>
              <span id="firstname">Firstname</span>
            </dt>
            <dd>{employeeEntity.firstname}</dd>
            <dt>
              <span id="secondname">Secondname</span>
            </dt>
            <dd>{employeeEntity.secondname}</dd>
            <dt>
              <span id="surename">Surename</span>
            </dt>
            <dd>{employeeEntity.surename}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{employeeEntity.email}</dd>
            <dt>
              <span id="mobilePhone">Mobile Phone</span>
            </dt>
            <dd>{employeeEntity.mobilePhone}</dd>
            <dt>
              <span id="organization">Organization</span>
            </dt>
            <dd>{employeeEntity.organization}</dd>
            <dt>
              <span id="department">Department</span>
            </dt>
            <dd>{employeeEntity.department}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{employeeEntity.country}</dd>
            <dt>
              <span id="streetAddress">Street Address</span>
            </dt>
            <dd>{employeeEntity.streetAddress}</dd>
            <dt>
              <span id="postalCode">Postal Code</span>
            </dt>
            <dd>{employeeEntity.postalCode}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{employeeEntity.city}</dd>
            <dt>
              <span id="stateProvince">State Province</span>
            </dt>
            <dd>{employeeEntity.stateProvince}</dd>
            <dt>
              <span id="rank">Rank</span>
            </dt>
            <dd>{employeeEntity.rank}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/employee/${employeeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
