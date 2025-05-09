import { cloneElement, Fragment } from 'react';
import { PaddingProps, StringOrNumberOrCallback } from 'victory-core';
import { ChartContainer } from '../ChartContainer/ChartContainer';
import { ChartLabel } from '../ChartLabel/ChartLabel';
import { ChartCommonStyles, ChartBulletStyles } from '../ChartTheme/ChartStyles';
import { ChartThemeDefinition } from '../ChartTheme/ChartTheme';
import { getBulletLabelX, getBulletLabelY } from '../ChartUtils/chart-label';
import { getPaddingForSide } from '../ChartUtils/chart-padding';
import { getBulletTheme } from '../ChartUtils/chart-theme-types';
import { getComponentTheme } from '../ChartUtils/chart-theme';

/**
 * ChartBulletTitle renders the bullet chart title.
 */
export interface ChartBulletTitleProps {
  /**
   * The ariaDesc prop specifies the description of the chart/SVG to assist with
   * accessibility for screen readers.
   *
   * Note: Overridden by the desc prop of containerComponent
   */
  ariaDesc?: string;
  /**
   * The ariaTitle prop specifies the title to be applied to the SVG to assist
   * accessibility for screen readers.
   *
   * Note: Overridden by the title prop of containerComponent
   */
  ariaTitle?: string;
  /**
   * The capHeight prop defines a text metric for the font being used: the expected height of capital letters.
   * This is necessary because of SVG, which (a) positions the *bottom* of the text at `y`, and (b) has no notion of
   * line height. The value should ideally use the same units as `lineHeight` and `dy`, preferably ems. If given a
   * unitless number, it is assumed to be ems.
   *
   * @propType number | string | Function
   */
  capHeight?: StringOrNumberOrCallback;
  /**
   * The height props specifies the height the svg viewBox of the chart container.
   * This value should be given as a number of pixels
   */
  height?: number;
  /**
   * The horizontal prop determines whether data will be plotted horizontally.
   * When this prop is set to true, the independent variable will be plotted on the y axis
   * and the dependent variable will be plotted on the x axis.
   */
  horizontal?: boolean;
  /**
   * The legend position relation to the chart. Valid values are 'bottom', 'bottom-left', and 'right'
   */
  legendPosition?: 'bottom' | 'bottom-left' | 'right';
  /**
   * The name prop is typically used to reference a component instance when defining shared events. However, this
   * optional prop may also be applied to child elements as an ID prefix. This is a workaround to ensure Victory
   * based components output unique IDs when multiple charts appear in a page.
   */
  name?: string;
  /**
   * The padding props specifies the amount of padding in number of pixels between
   * the edge of the chart and any rendered child components. This prop can be given
   * as a number or as an object with padding specified for top, bottom, left
   * and right.
   *
   * Note: The underlying bullet chart is a different size than height and width. For a horizontal chart, left and right
   * padding may need to be applied at (approx) 2 to 1 scale.
   *
   * @propType number | { top: number, bottom: number, left: number, right: number }
   */
  padding?: PaddingProps;
  /**
   * The standalone prop determines whether the component will render a standalone svg
   * or a <g> tag that will be included in an external svg. Set standalone to false to
   * compose ChartLine with other components within an enclosing <svg> tag.
   */
  standalone?: boolean;
  /**
   * The subtitle to render for grouped bullets
   */
  subTitle?: string;
  /**
   * The label component to render the chart subTitle.
   *
   * Note: Default label properties may be applied
   */
  subTitleComponent?: React.ReactElement<any>;
  /**
   * The theme prop takes a style object with nested data, labels, and parent objects.
   * You can create this object yourself, or you can use a theme provided by
   * When using ChartLine as a solo component, implement the theme directly on
   * ChartLine. If you are wrapping ChartLine in ChartChart or ChartGroup,
   * please call the theme on the outermost wrapper component instead.
   *
   * @propType object
   */
  theme?: ChartThemeDefinition;
  /**
   * Specifies the theme color. Valid values are 'blue', 'green', 'multi', etc.
   *
   * Note: Not compatible with theme prop
   *
   * @example themeColor={ChartThemeColor.blue}
   */
  themeColor?: string;
  /**
   * The title to render for grouped bullets
   */
  title?: string;
  /**
   * The label component to render the chart title.
   *
   * Note: Default label properties may be applied
   */
  titleComponent?: React.ReactElement<any>;
  /**
   * The title position relation to the chart. Valid values are 'left', and 'top-left'
   *
   * Note: These properties are only valid for horizontal layouts
   */
  titlePosition?: 'left' | 'top-left';
  /**
   * The width props specifies the width of the svg viewBox of the chart container
   * This value should be given as a number of pixels
   */
  width?: number;
}

export const ChartBulletTitle: React.FunctionComponent<ChartBulletTitleProps> = ({
  ariaDesc,
  ariaTitle,
  capHeight = 1.1,
  horizontal = true,
  legendPosition = 'bottom',
  name,
  padding,
  standalone = true,
  subTitle,
  themeColor,
  title,
  titleComponent = <ChartLabel />,
  titlePosition,

  // destructure last
  theme = getBulletTheme(themeColor),
  height = horizontal ? theme.chart.height : theme.chart.width,
  width = horizontal ? theme.chart.width : theme.chart.height
}: ChartBulletTitleProps) => {
  const chartSize = {
    height: horizontal ? theme.chart.height : height,
    width: horizontal ? width : theme.chart.height
  };

  const defaultPadding = {
    bottom: getPaddingForSide('bottom', padding, theme.chart.padding),
    left: getPaddingForSide('left', padding, theme.chart.padding),
    right: getPaddingForSide('right', padding, theme.chart.padding),
    top: getPaddingForSide('top', padding, theme.chart.padding)
  };

  // Returns title
  const getTitle = () => {
    const componentTheme = getComponentTheme(themeColor);
    const showBoth = title && subTitle;

    let labelPosition: 'bottom' | 'left' | 'top-left' = horizontal ? 'left' : 'bottom';
    if (titlePosition && titlePosition.includes('left') && horizontal) {
      labelPosition = titlePosition;
    }

    let textAnchor = 'middle';
    if (labelPosition === 'top-left') {
      textAnchor = 'start';
    } else if (horizontal) {
      textAnchor = 'end';
    }
    // Adjust for padding
    let dy = ChartCommonStyles.legend.margin * 2 - defaultPadding.bottom;
    if (labelPosition === 'top-left') {
      const offsetLabelPosition = showBoth ? 0 : 1;
      dy =
        defaultPadding.top * 0.5 +
        (defaultPadding.bottom * 0.5 - defaultPadding.bottom) +
        58 -
        ChartCommonStyles.legend.margin +
        offsetLabelPosition;
    } else if (horizontal) {
      dy = defaultPadding.top * 0.5 + (defaultPadding.bottom * 0.5 - defaultPadding.bottom);
    }

    // The x and y calculations below are used to adjust the position of the title, based on padding and scale.
    // This ensures that when padding is adjusted, the title moves along with the chart's position.
    return cloneElement(titleComponent, {
      ...(showBoth && { capHeight }),
      ...(name && { id: () => `${name}-${(titleComponent as any).type.displayName}` }),
      style: [ChartBulletStyles.label.title, ChartBulletStyles.label.subTitle],
      text: showBoth ? [title, subTitle] : title,
      textAnchor,
      verticalAnchor: labelPosition === 'top-left' ? 'end' : 'middle',
      // Adjust for padding
      x: horizontal
        ? getBulletLabelX({
            chartWidth: chartSize.width,
            dx:
              labelPosition === 'top-left'
                ? defaultPadding.left
                : defaultPadding.left - ChartCommonStyles.label.margin * 1.75,
            labelPosition: 'left', // skip 'bottom'
            legendPosition,
            svgWidth: width
          })
        : defaultPadding.left * 0.5 +
          (defaultPadding.right * 0.5 - (defaultPadding.right - 50)) +
          ChartBulletStyles.qualitativeRangeWidth / 2,
      y: getBulletLabelY({
        chartHeight: chartSize.height,
        dy,
        labelPosition
      }),
      ...titleComponent.props,
      ...(componentTheme?.label && componentTheme.label) // override backgroundStyle
    });
  };

  return standalone ? (
    <ChartContainer desc={ariaDesc} height={height} title={ariaTitle} width={width}>
      {getTitle()}
    </ChartContainer>
  ) : (
    <Fragment>{getTitle()}</Fragment>
  );
};
ChartBulletTitle.displayName = 'ChartBulletTitle';
