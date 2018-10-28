import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './respond.reducer';
import { IRespond } from 'app/shared/model/respond.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRespondDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RespondDetail extends React.Component<IRespondDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { respondEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Respond [<b>{respondEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{respondEntity.status}</dd>
            <dt>Employee</dt>
            <dd>{respondEntity.employee ? respondEntity.employee.id : ''}</dd>
            <dt>Request</dt>
            <dd>{respondEntity.request ? respondEntity.request.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/respond" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/respond/${respondEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ respond }: IRootState) => ({
  respondEntity: respond.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RespondDetail);
