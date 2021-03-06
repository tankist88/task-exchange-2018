import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './notification-type.reducer';
import { INotificationType } from 'app/shared/model/notification-type.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificationTypeUpdateState {
  isNew: boolean;
}

export class NotificationTypeUpdate extends React.Component<INotificationTypeUpdateProps, INotificationTypeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { notificationTypeEntity } = this.props;
      const entity = {
        ...notificationTypeEntity,
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
    this.props.history.push('/entity/notification-type');
  };

  render() {
    const { notificationTypeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="taskExchangeApp.notificationType.home.createOrEditLabel">Create or edit a NotificationType</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notificationTypeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="notification-type-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel">Code</Label>
                  <AvInput
                    id="notification-type-code"
                    type="select"
                    className="form-control"
                    name="code"
                    value={(!isNew && notificationTypeEntity.code) || 'NEW_REQUEST'}
                  >
                    <option value="NEW_REQUEST">NEW_REQUEST</option>
                    <option value="NEW_RESPONSE">NEW_RESPONSE</option>
                    <option value="YOU_ARE_THE_CHOSEN_ONE">YOU_ARE_THE_CHOSEN_ONE</option>
                    <option value="REQUEST_CONFIRMED">REQUEST_CONFIRMED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField id="notification-type-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="textLabel" for="text">
                    Text
                  </Label>
                  <AvField id="notification-type-text" type="text" name="text" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/notification-type" replace color="info">
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
  notificationTypeEntity: storeState.notificationType.entity,
  loading: storeState.notificationType.loading,
  updating: storeState.notificationType.updating,
  updateSuccess: storeState.notificationType.updateSuccess
});

const mapDispatchToProps = {
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
)(NotificationTypeUpdate);
