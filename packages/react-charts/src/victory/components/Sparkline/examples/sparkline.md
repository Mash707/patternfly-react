---
id: Sparkline chart
section: charts
propComponents: [
  'ChartArea',
  'ChartContainer',
  'ChartGroup',
  'ChartLabel',
  'ChartVoronoiContainer'
]
hideDarkMode: true
---

import { ChartArea, ChartContainer, ChartGroup, ChartLabel, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts/victory';

<!-- Workaround for documentation-framework issue https://github.com/patternfly/patternfly-react/issues/11455
import './sparkline.css';
-->

## Introduction
Note: PatternFly React charts live in its own package at [@patternfly/react-charts](https://www.npmjs.com/package/@patternfly/react-charts)!

The examples below are based on the [Victory](https://formidable.com/open-source/victory/docs/victory-chart/) chart library, along with additional functionality, custom components, and theming for PatternFly. This provides a collection of React based components you can use to build PatternFly patterns with consistent markup, styling, and behavior.

## Examples
### Basic
```js
import { ChartArea, ChartContainer, ChartGroup, ChartLabel, ChartVoronoiContainer } from '@patternfly/react-charts/victory';

<div style={{ marginLeft: '50px', marginTop: '50px', height: '135px' }}>
  <div style={{ height: '100px', width: '400px' }}>
    <ChartGroup
      ariaDesc="Average number of pets"
      ariaTitle="Sparkline chart example"
      containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
      height={100}
      maxDomain={{y: 9}}
      name="chart1"
      padding={0}
      width={400}
    >
      <ChartArea
        data={[
          { name: 'Cats', x: '2015', y: 3 },
          { name: 'Cats', x: '2016', y: 4 },
          { name: 'Cats', x: '2017', y: 8 },
          { name: 'Cats', x: '2018', y: 6 }
        ]}
      />
    </ChartGroup>
  </div>
  <ChartContainer title="CPU utilization">
    <ChartLabel text="CPU utilization" dy={15}/>
  </ChartContainer>
</div>
```

### Green

This demonstrates an alternate way of applying tooltips using CSS overflow

```js
import { ChartArea, ChartContainer, ChartGroup, ChartLabel, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts/victory';

// Workaround for documentation-framework issue https://github.com/patternfly/patternfly-react/issues/11455
const sheet = (() => {
  var style = document.createElement("style");
  document.head.appendChild(style);
  return style.sheet;
})();

sheet.insertRule(".ws-react-charts-sparkline-overflow { margin-left: 50px; margin-top: 50px; height: 135px; }", sheet.cssRules.length);
sheet.insertRule(".ws-react-charts-sparkline-overflow svg { overflow: visible; }", sheet.cssRules.length);

<div className="ws-react-charts-sparkline-overflow">
  <div style={{ height: '100px', width: '400px' }}>
    <ChartGroup
      ariaDesc="Average number of pets"
      ariaTitle="Sparkline chart example"
      containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} />}
      height={100}
      maxDomain={{y: 9}}
      name="chart2"
      padding={0}
      themeColor={ChartThemeColor.green}
      width={400}
    >
      <ChartArea
        data={[
          { name: 'Cats', x: '2015', y: 3 },
          { name: 'Cats', x: '2016', y: 4 },
          { name: 'Cats', x: '2017', y: 8 },
          { name: 'Cats', x: '2018', y: 6 }
        ]}
      />
    </ChartGroup>
  </div>
  <ChartContainer title="CPU utilization">
    <ChartLabel text="CPU utilization" dy={15}/>
  </ChartContainer>
</div>
```

## Documentation
### Tips
- See Victory's [FAQ](https://formidable.com/open-source/victory/docs/faq)
- For single data points or zero values, you may want to set the `domain` prop
- Use `ChartGroup` in place of `Chart` when an axis and labels are not desired
- Themes are inherited, so a default theme may override `themeColor` for a child component
- The `theme` and `themeColor` props should be applied at the most top level component

### Note
Currently, the generated documentation below is not able to resolve type definitions from Victory imports. For the 
components used in the examples above, Victory pass-thru props are also documented here:

- For `ChartArea` props, see [VictoryArea](https://formidable.com/open-source/victory/docs/victory-area)
- For `ChartGroup` props, see [VictoryGroup](https://formidable.com/open-source/victory/docs/victory-group)
- For `ChartLabel` props, see [VictoryLabel](https://formidable.com/open-source/victory/docs/victory-label)
- For `ChartVoronoiContainer` props, see [VictoryVoronoiContainer](https://formidable.com/open-source/victory/docs/victory-voronoi-container)
