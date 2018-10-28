import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IFeedback } from 'app/shared/model/feedback.model';
import { getEntities as getFeedbacks } from 'app/entities/feedback/feedback.reducer';
import { getEntity, updateEntity, createEntity, reset } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRequestUpdateState {
  isNew: boolean;
  customerId: string;
  performerId: string;
  taskId: string;
  feedbackId: string;
}

export class RequestUpdate extends React.Component<IRequestUpdateProps, IRequestUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '0',
      performerId: '0',
      taskId: '0',
      feedbackId: '0',
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

    this.props.getEmployees();
    this.props.getTasks();
    this.props.getFeedbacks();
  }

  saveEntity = (event, errors, values) => {
    values.createTime = new Date(values.createTime);
    values.closeTime = new Date(values.closeTime);
    values.changeTime = new Date(values.changeTime);

    if (errors.length === 0) {
      const { requestEntity } = this.props;
      const entity = {
        ...requestEntity,
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
    this.props.history.push('/entity/request');
  };

  render() {
    const { requestEntity, employees, tasks, feedbacks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="taskExchangeApp.request.home.createOrEditLabel">Create or edit a Request</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : requestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    Create Time
                  </Label>
                  <AvInput
                    id="request-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.createTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="closeTimeLabel" for="closeTime">
                    Close Time
                  </Label>
                  <AvInput
                    id="request-closeTime"
                    type="datetime-local"
                    className="form-control"
                    name="closeTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.closeTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="changeTimeLabel" for="changeTime">
                    Change Time
                  </Label>
                  <AvInput
                    id="request-changeTime"
                    type="datetime-local"
                    className="form-control"
                    name="changeTime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.changeTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="customerIdLabel" for="customerId">
                    Customer Id
                  </Label>
                  <AvField id="request-customerId" type="string" className="form-control" name="customerId" />
                </AvGroup>
                <AvGroup>
                  <Label id="performerLabel" for="performer">
                    Performer
                  </Label>
                  <AvField id="request-performer" type="string" className="form-control" name="performer" />
                </AvGroup>
                <AvGroup>
                  <Label id="taskIdLabel" for="taskId">
                    Task Id
                  </Label>
                  <AvField id="request-taskId" type="string" className="form-control" name="taskId" />
                </AvGroup>
                <AvGroup>
                  <Label id="feedbackIdLabel" for="feedbackId">
                    Feedback Id
                  </Label>
                  <AvField id="request-feedbackId" type="string" className="form-control" name="feedbackId" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">Status</Label>
                  <AvInput
                    id="request-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && requestEntity.status) || 'NEW'}
                  >
                    <option value="NEW">NEW</option>
                    <option value="PERFORMERS_REQUESTED">PERFORMERS_REQUESTED</option>
                    <option value="PERFORMERS_ACCEPTED">PERFORMERS_ACCEPTED</option>
                    <option value="PERFORMERS_SELECTED">PERFORMERS_SELECTED</option>
                    <option value="PERFORMER_CONFIRMED">PERFORMER_CONFIRMED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.id">Customer</Label>
                  <AvInput id="request-customer" type="select" className="form-control" name="customer.id">
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
                  <Label for="performer.id">Performer</Label>
                  <AvInput id="request-performer" type="select" className="form-control" name="performer.id">
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
                  <Label for="task.id">Task</Label>
                  <AvInput id="request-task" type="select" className="form-control" name="task.id">
                    <option value="" key="0" />
                    {tasks
                      ? tasks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="feedback.id">Feedback</Label>
                  <AvInput id="request-feedback" type="select" className="form-control" name="feedback.id">
                    <option value="" key="0" />
                    {feedbacks
                      ? feedbacks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/request" replace color="info">
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
  employees: storeState.employee.entities,
  tasks: storeState.task.entities,
  feedbacks: storeState.feedback.entities,
  requestEntity: storeState.request.entity,
  loading: storeState.request.loading,
  updating: storeState.request.updating,
  updateSuccess: storeState.request.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getTasks,
  getFeedbacks,
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
)(RequestUpdate);
