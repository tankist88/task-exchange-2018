import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRequest } from 'app/shared/model/request.model';
import { getEntities as getRequests } from 'app/entities/request/request.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeUpdateState {
  isNew: boolean;
  requestId: string;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRequests();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/employee');
  };

  render() {
    const { employeeEntity, requests, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="taskExchangeApp.employee.home.createOrEditLabel">Create or edit a Employee</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roleLabel">Role</Label>
                  <AvInput
                    id="employee-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && employeeEntity.role) || 'PERFORMER'}
                  >
                    <option value="PERFORMER">PERFORMER</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="commandRoleLabel">Command Role</Label>
                  <AvInput
                    id="employee-commandRole"
                    type="select"
                    className="form-control"
                    name="commandRole"
                    value={(!isNew && employeeEntity.commandRole) || 'DEVELOPER'}
                  >
                    <option value="DEVELOPER">DEVELOPER</option>
                    <option value="SYSTEM_ANALYST">SYSTEM_ANALYST</option>
                    <option value="BUSINESS_ANALYST">BUSINESS_ANALYST</option>
                    <option value="PRODUCT_OWNER">PRODUCT_OWNER</option>
                    <option value="DEVOPS_ENGINEER">DEVOPS_ENGINEER</option>
                    <option value="HAND_TESTER">HAND_TESTER</option>
                    <option value="AUTO_TESTER">AUTO_TESTER</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="usernameLabel" for="username">
                    Username
                  </Label>
                  <AvField id="employee-username" type="text" name="username" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstnameLabel" for="firstname">
                    Firstname
                  </Label>
                  <AvField id="employee-firstname" type="text" name="firstname" />
                </AvGroup>
                <AvGroup>
                  <Label id="secondnameLabel" for="secondname">
                    Secondname
                  </Label>
                  <AvField id="employee-secondname" type="text" name="secondname" />
                </AvGroup>
                <AvGroup>
                  <Label id="surenameLabel" for="surename">
                    Surename
                  </Label>
                  <AvField id="employee-surename" type="text" name="surename" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    Email
                  </Label>
                  <AvField id="employee-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="mobilePhoneLabel" for="mobilePhone">
                    Mobile Phone
                  </Label>
                  <AvField id="employee-mobilePhone" type="text" name="mobilePhone" />
                </AvGroup>
                <AvGroup>
                  <Label id="organizationLabel" for="organization">
                    Organization
                  </Label>
                  <AvField id="employee-organization" type="text" name="organization" />
                </AvGroup>
                <AvGroup>
                  <Label id="departmentLabel" for="department">
                    Department
                  </Label>
                  <AvField id="employee-department" type="text" name="department" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="country">
                    Country
                  </Label>
                  <AvField id="employee-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="streetAddressLabel" for="streetAddress">
                    Street Address
                  </Label>
                  <AvField id="employee-streetAddress" type="text" name="streetAddress" />
                </AvGroup>
                <AvGroup>
                  <Label id="postalCodeLabel" for="postalCode">
                    Postal Code
                  </Label>
                  <AvField id="employee-postalCode" type="text" name="postalCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    City
                  </Label>
                  <AvField id="employee-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="stateProvinceLabel" for="stateProvince">
                    State Province
                  </Label>
                  <AvField id="employee-stateProvince" type="text" name="stateProvince" />
                </AvGroup>
                <AvGroup>
                  <Label id="rankLabel" for="rank">
                    Rank
                  </Label>
                  <AvField id="employee-rank" type="string" className="form-control" name="rank" />
                </AvGroup>
                <AvGroup>
                  <Label for="request.id">Request</Label>
                  <AvInput id="employee-request" type="select" className="form-control" name="request.id">
                    <option value="" key="0" />
                    {requests
                      ? requests.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  requests: storeState.request.entities,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getRequests,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeUpdate);
