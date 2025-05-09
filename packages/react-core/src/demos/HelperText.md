---
id: Helper text
section: components
---

import { useEffect, useState } from 'react';
import MinusIcon from '@patternfly/react-icons/dist/esm/icons/minus-icon';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import CheckIcon from '@patternfly/react-icons/dist/esm/icons/check-icon';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';

## Demos

### Static helper text

In this demo the text content of the helper text item will always be visible to users and will never change.

The `aria-describedby` attribute is passed into the text input component and is linked to the `id` of the helper text component. This allows assistive technologies to notify users of the helper text content when the input receives focus, which can be helpful if a user navigates away from and then back to the input.

Note that this demo does not validate the text input component. When it would need to be validated, there are other steps that would need to be taken to make it accessible, such as passing in `aria-invalid` and `aria-live` attributes to the appropriate components.

```ts file='./examples/HelperText/HelperTextStatic.tsx'

```

### Dynamic helper text

In this demo the text content of the helper text item dynamically updates based on the input value. When the input has a value of `johndoe`, an error is rendered to simulate a username already being taken, while an empty input renders default text. When the input is valid, no helper text is rendered.

The `aria-describedby` attribute is passed into the text input component and is linked to the `id` of the helper text component. Similar to the static variant with static text demo, this allows assistive technologies to notify users of the helper text content when the navigating to the input.

An `aria-live` region is passed into the helper text component, which allows assistive technologies to announce to users when any dynamic content within it updates, such as when the text content changes or gets rendered. Without this attribute, a user would have to navigate out of and back into the input field multiple times to check the status of their input.

The `aria-invalid` attribute is also passed into the text input, which allows assistive technologies to notify users that an input is invalid. When this attribute is true, it's important that users are notified of what is causing the input to be invalid; in this case, `aria-describedby` and `aria-live` help accomplish this.

```ts file='./examples/HelperText/HelperTextDynamic.tsx'

```

### Static text and dynamic status

In this demo the text content of the helper text item remains static and never changes, but the icons and styling will change as the validation of the input changes.

The `aria-describedby` attribute is passed into the text input component and is linked to the `id` attribute of a helper text item that results in an invalid input. This will allow assistive technologies to only be notified of any outstanding criteria that has not been met when the input receives focus.

Similar to the [with dynamic text example](/components/helper-text/react-demos#with-dynamic-text), the `aria-invalid` attribute is passed in, allowing assistive technologies to announce to users when at least 1 item is causing the input to be invalid.

```ts file='./examples/HelperText/HelperTextStaticTextDynamicVariant.tsx'

```
