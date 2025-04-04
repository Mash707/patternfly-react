---
id: Split
cssPrefix: pf-v6-l-split
section: layouts
propComponents: ['Split', 'SplitItem']
---

import './split.css';

## Examples

### Basic

```js
import { Split, SplitItem } from '@patternfly/react-core';

<Split>
  <SplitItem>content</SplitItem>
  <SplitItem isFilled>pf-m-fill</SplitItem>
  <SplitItem>content</SplitItem>
</Split>;
```

### With gutter

```js
import { Split, SplitItem } from '@patternfly/react-core';

<Split hasGutter>
  <SplitItem>content</SplitItem>
  <SplitItem isFilled>pf-m-fill</SplitItem>
  <SplitItem>content</SplitItem>
</Split>;
```

### Wrappable

```js
import { Split, SplitItem } from '@patternfly/react-core';

<Split hasGutter isWrappable>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
  <SplitItem>content</SplitItem>
</Split>;
```
