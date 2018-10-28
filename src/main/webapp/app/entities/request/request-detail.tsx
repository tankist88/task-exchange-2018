import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RequestDetail extends React.Component<IRequestDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { requestEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Request [<b>{requestEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createTime">Create Time</span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="closeTime">Close Time</span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.closeTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="changeTime">Change Time</span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.changeTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{requestEntity.status}</dd>
            <dt>Customer</dt>
            <dd>{requestEntity.customer ? requestEntity.customer.id : ''}</dd>
            <dt>Performer</dt>
            <dd>{requestEntity.performer ? requestEntity.performer.id : ''}</dd>
            <dt>Task</dt>
            <dd>{requestEntity.task ? requestEntity.task.id : ''}</dd>
            <dt>Feedback</dt>
            <dd>{requestEntity.feedback ? requestEntity.feedback.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/request" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/request/${requestEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ request }: IRootState) => ({
  requestEntity: request.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestDetail);
