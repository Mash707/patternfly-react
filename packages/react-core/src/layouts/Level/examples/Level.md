---
id: Level
cssPrefix: pf-v6-l-level
section: layouts
propComponents: ['Level', 'LevelItem']
---

import './level.css';

## Examples

### Basic

```js
import { Level, LevelItem } from '@patternfly/react-core';

<Level>
  <LevelItem>Level Item</LevelItem>
  <LevelItem>Level Item</LevelItem>
  <LevelItem>Level Item</LevelItem>
</Level>;
```

### With gutters

```js
import { Level, LevelItem } from '@patternfly/react-core';

<Level hasGutter>
  <LevelItem>Level Item</LevelItem>
  <LevelItem>Level Item</LevelItem>
  <LevelItem>Level Item</LevelItem>
</Level>;
```
