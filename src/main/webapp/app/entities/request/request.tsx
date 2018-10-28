import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Request extends React.Component<IRequestProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { requestList, match } = this.props;
    return (
      <div>
        <h2 id="request-heading">
          Requests
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Request
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Create Time</th>
                <th>Close Time</th>
                <th>Change Time</th>
                <th>Customer Id</th>
                <th>Performer</th>
                <th>Task Id</th>
                <th>Feedback Id</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Performer</th>
                <th>Task</th>
                <th>Feedback</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {requestList.map((request, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${request.id}`} color="link" size="sm">
                      {request.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={request.createTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={request.closeTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={request.changeTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{request.customerId}</td>
                  <td>{request.performer}</td>
                  <td>{request.taskId}</td>
                  <td>{request.feedbackId}</td>
                  <td>{request.status}</td>
                  <td>{request.customer ? <Link to={`employee/${request.customer.id}`}>{request.customer.id}</Link> : ''}</td>
                  <td>{request.performer ? <Link to={`employee/${request.performer.id}`}>{request.performer.id}</Link> : ''}</td>
                  <td>{request.task ? <Link to={`task/${request.task.id}`}>{request.task.id}</Link> : ''}</td>
                  <td>{request.feedback ? <Link to={`feedback/${request.feedback.id}`}>{request.feedback.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${request.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${request.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${request.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ request }: IRootState) => ({
  requestList: request.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request);
