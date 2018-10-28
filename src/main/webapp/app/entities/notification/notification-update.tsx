import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRequest } from 'app/shared/model/request.model';
import { getEntities as getRequests } from 'app/entities/request/request.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { INotificationType } from 'app/shared/model/notification-type.model';
import { getEntities as getNotificationTypes } from 'app/entities/notification-type/notification-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificationUpdateState {
  isNew: boolean;
  requestId: string;
  employeeId: string;
  typeId: string;
}

export class NotificationUpdate extends React.Component<INotificationUpdateProps, INotificationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '0',
      employeeId: '0',
      typeId: '0',
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
    this.props.getEmployees();
    this.props.getNotificationTypes();
  }

  saveEntity = (event, errors, values) => {
    values.createTime = new Date(values.createTime);

    if (errors.length === 0) {
      const { notificationEntity } = this.props;
      const entity = {
        ...notificationEntity,
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
    this.props.history.push('/entity/notification');
  };

  render() {
    const { notificationEntity, requests, employees, notificationTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="taskExchangeApp.notification.home.createOrEditLabel">Create or edit a Notification</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notificationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="notification-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    Create Time
                  </Label>
                  <AvInput
                    id="notification-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.notificationEntity.createTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="readedLabel" check>
                    <AvInput id="notification-readed" type="checkbox" className="form-control" name="readed" />
                    Readed
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="request.id">Request</Label>
                  <AvInput id="notification-request" type="select" className="form-control" name="request.id">
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
                <AvGroup>
                  <Label for="employee.id">Employee</Label>
                  <AvInput id="notification-employee" type="select" className="form-control" name="employee.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="type.id">Type</Label>
                  <AvInput id="notification-type" type="select" className="form-control" name="type.id">
                    <option value="" key="0" />
                    {notificationTypes
                      ? notificationTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/notification" replace color="info">
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
  employees: storeState.employee.entities,
  notificationTypes: storeState.notificationType.entities,
  notificationEntity: storeState.notification.entity,
  loading: storeState.notification.loading,
  updating: storeState.notification.updating,
  updateSuccess: storeState.notification.updateSuccess
});

const mapDispatchToProps = {
  getRequests,
  getEmployees,
  getNotificationTypes,
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
)(NotificationUpdate);
