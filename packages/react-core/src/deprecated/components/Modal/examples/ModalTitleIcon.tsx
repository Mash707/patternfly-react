import { Fragment, useState } from 'react';
import { Button } from '@patternfly/react-core';
import { Modal as ModalDeprecated } from '@patternfly/react-core/deprecated';

export const ModalTitleIcon: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <Button variant="primary" onClick={handleModalToggle}>
        Show title icon modal
      </Button>
      <ModalDeprecated
        title="Title icon modal"
        titleIconVariant="warning"
        isOpen={isModalOpen}
        aria-describedby="modal-title-icon-description"
        onClose={handleModalToggle}
        actions={[
          <Button key="confirm" variant="primary" onClick={handleModalToggle}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>
        ]}
      >
        <span id="modal-title-icon-description">
          When static text describing the modal is available outside of the modal header, it can be given an ID that is
          then passed in as the modal's aria-describedby value.
        </span>
        <br />
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    </Fragment>
  );
};
