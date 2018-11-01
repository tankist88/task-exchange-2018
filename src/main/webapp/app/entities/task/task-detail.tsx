import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TaskDetail extends React.Component<ITaskDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taskEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Task [<b>{taskEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="originalText">Original Text</span>
            </dt>
            <dd>{taskEntity.originalText}</dd>
            <dt>
              <span id="commaSeparatedKeywords">Comma Separated Keywords</span>
            </dt>
            <dd>{taskEntity.commaSeparatedKeywords}</dd>
            <dt>
              <span id="system">System</span>
            </dt>
            <dd>{taskEntity.system}</dd>
            <dt>
              <span id="subsystem">Subsystem</span>
            </dt>
            <dd>{taskEntity.subsystem}</dd>
            <dt>
              <span id="complexity">Complexity</span>
            </dt>
            <dd>{taskEntity.complexity}</dd>
            <dt>
              <span id="resourcesCount">Resources Count</span>
            </dt>
            <dd>{taskEntity.resourcesCount}</dd>
            <dt>
              <span id="newIntegrations">New Integrations</span>
            </dt>
            <dd>{taskEntity.newIntegrations ? 'true' : 'false'}</dd>
            <dt>
              <span id="modifyIntegrations">Modify Integrations</span>
            </dt>
            <dd>{taskEntity.modifyIntegrations ? 'true' : 'false'}</dd>
            <dt>
              <span id="newPrintForms">New Print Forms</span>
            </dt>
            <dd>{taskEntity.newPrintForms ? 'true' : 'false'}</dd>
            <dt>
              <span id="modifyPrintForms">Modify Print Forms</span>
            </dt>
            <dd>{taskEntity.modifyPrintForms ? 'true' : 'false'}</dd>
            <dt>Performer</dt>
            <dd>{taskEntity.performer ? taskEntity.performer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/task" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/task/${taskEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
