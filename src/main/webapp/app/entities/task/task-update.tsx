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
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITaskUpdateState {
  isNew: boolean;
  employeeId: string;
}

export class TaskUpdate extends React.Component<ITaskUpdateProps, ITaskUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { taskEntity } = this.props;
      const entity = {
        ...taskEntity,
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
    this.props.history.push('/entity/task');
  };

  render() {
    const { taskEntity, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="taskExchangeApp.task.home.createOrEditLabel">Create or edit a Task</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taskEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="originalTextLabel" for="originalText">
                    Original Text
                  </Label>
                  <AvField id="task-originalText" type="text" name="originalText" />
                </AvGroup>
                <AvGroup>
                  <Label id="commaSeparatedKeywordsLabel" for="commaSeparatedKeywords">
                    Comma Separated Keywords
                  </Label>
                  <AvField id="task-commaSeparatedKeywords" type="text" name="commaSeparatedKeywords" />
                </AvGroup>
                <AvGroup>
                  <Label id="systemLabel" for="system">
                    System
                  </Label>
                  <AvField id="task-system" type="text" name="system" />
                </AvGroup>
                <AvGroup>
                  <Label id="subsystemLabel" for="subsystem">
                    Subsystem
                  </Label>
                  <AvField id="task-subsystem" type="text" name="subsystem" />
                </AvGroup>
                <AvGroup>
                  <Label id="complexityLabel">Complexity</Label>
                  <AvInput
                    id="task-complexity"
                    type="select"
                    className="form-control"
                    name="complexity"
                    value={(!isNew && taskEntity.complexity) || 'LOW'}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="newIntegrationsLabel" check>
                    <AvInput id="task-newIntegrations" type="checkbox" className="form-control" name="newIntegrations" />
                    New Integrations
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="modifyIntegrationsLabel" check>
                    <AvInput id="task-modifyIntegrations" type="checkbox" className="form-control" name="modifyIntegrations" />
                    Modify Integrations
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="newPrintFormsLabel" check>
                    <AvInput id="task-newPrintForms" type="checkbox" className="form-control" name="newPrintForms" />
                    New Print Forms
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="modifyPrintFormsLabel" check>
                    <AvInput id="task-modifyPrintForms" type="checkbox" className="form-control" name="modifyPrintForms" />
                    Modify Print Forms
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="employee.id">Employee</Label>
                  <AvInput id="task-employee" type="select" className="form-control" name="employee.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/task" replace color="info">
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
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
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
)(TaskUpdate);
