import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './performers.reducer';
import { IPerformers } from 'app/shared/model/performers.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPerformersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PerformersDetail extends React.Component<IPerformersDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { performersEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Performers [<b>{performersEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>Employee</dt>
            <dd>{performersEntity.employee ? performersEntity.employee.id : ''}</dd>
            <dt>Request</dt>
            <dd>{performersEntity.request ? performersEntity.request.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/performers" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/performers/${performersEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ performers }: IRootState) => ({
  performersEntity: performers.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformersDetail);
