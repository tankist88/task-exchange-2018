import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/task">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Task
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/employee">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Employee
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/respond">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Respond
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/feedback">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Feedback
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/request">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Request
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/notification">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Notification
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/notification-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Notification Type
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
