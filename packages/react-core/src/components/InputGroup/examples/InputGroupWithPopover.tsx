import React from 'react';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import { Button, InputGroup, TextInput, Popover, PopoverPosition } from '@patternfly/react-core';

export const InputGroupWithPopover: React.FunctionComponent = () => (
  <React.Fragment>
    <InputGroup>
      <TextInput
        name="textInput-with-popover-1"
        id="textInput-with-popover-1"
        type="text"
        aria-label="first input example with popover"
      />
      <Popover
        aria-label="popover example"
        position={PopoverPosition.top}
        bodyContent="This field is an example of an input group with a popover."
      >
        <Button variant="control" aria-label="popover for input">
          <QuestionCircleIcon />
        </Button>
      </Popover>
    </InputGroup>
    <br />
    <InputGroup>
      <TextInput
        name="textInput-with-popover-2"
        id="textInput-with-popover-2"
        type="text"
        aria-label="second input example with popover"
      />
      <Popover
        aria-label="popover example"
        position={PopoverPosition.top}
        bodyContent="This field is an example of an input group with a popover."
      >
        <Button variant="plain" aria-label="Popover for input">
          <QuestionCircleIcon />
        </Button>
      </Popover>
    </InputGroup>
  </React.Fragment>
);
