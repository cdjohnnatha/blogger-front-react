import React  from 'react'
import { Button } from 'reactstrap';

const SetupButtons = props => {
  let destroyBtn = null;
  let updateBtn = null;
  if (typeof props.destroyAction !== 'undefined') {
    destroyBtn = <Button id="destroyBtn" outline color="danger" onClick={event => props.destroyAction()}>Delete</Button>;
  }
  if (typeof props.updateAction !== 'undefined') {
    updateBtn = <Button outline color="warning" className="mr-2" onClick={event => props.updateAction()}>Edit</Button>
  }
  return (
    <div className="d-flex justify-content-start">
      {updateBtn}
      {destroyBtn}
    </div>
  );
}

export default SetupButtons;
