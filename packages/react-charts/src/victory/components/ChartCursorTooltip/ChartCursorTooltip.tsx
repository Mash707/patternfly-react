import { cloneElement } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {
  Helpers,
  NumberOrCallback,
  OrientationOrCallback,
  StringOrNumberOrCallback,
  TextAnchorType,
  VictoryStyleObject
} from 'victory-core';
import { VictoryTooltip } from 'victory-tooltip';
import { ChartThemeDefinition } from '../ChartTheme/ChartTheme';
import { ChartTooltip, ChartTooltipProps } from '../ChartTooltip/ChartTooltip';
import { getCursorTooltipCenterOffset, getCursorTooltipPoniterOrientation } from '../ChartUtils/chart-tooltip';
import { getTheme } from '../ChartUtils/chart-theme';
import { ChartCursorFlyout } from './ChartCursorFlyout';

/**
 * This tooltip has default values intended for use with a cursor container.
 *
 * See https://github.com/FormidableLabs/victory/blob/main/packages/victory-tooltip/src/index.d.ts
 */
export interface ChartCursorTooltipProps extends ChartTooltipProps {
  /**
   * The active prop specifies whether the tooltip component should be displayed.
   */
  active?: boolean;
  /**
   * When true, tooltip events will set the active prop on both data and label elements.
   */
  activateData?: boolean;
  /**
   * The angle prop specifies the angle to rotate the tooltip around its origin point.
   */
  angle?: number;
  /**
   * The center prop determines the position of the center of the tooltip flyout. This prop should be given as an object
   * that describes the desired x and y svg coordinates of the center of the tooltip. This prop is useful for
   * positioning the flyout of a tooltip independent from the pointer. When ChartTooltip is used with
   * ChartVoronoiContainer, the center prop is what enables the mouseFollowTooltips option. When this prop is set,
   * non-zero pointerLength values will no longer be respected.
   */
  center?: { x: number; y: number };
  /**
   * The centerOffset prop determines the position of the center of the tooltip flyout in relation to the flyout
   * pointer. This prop should be given as an object of x and y, where each is either a numeric offset value or a
   * function that returns a numeric value. When this prop is set, non-zero pointerLength values will no longer be
   * respected.
   *
   * @propType { x: number | Function, y: number | Function }
   */
  centerOffset?: {
    x?: NumberOrCallback;
    y?: NumberOrCallback;
  };
  /**
   * The constrainToVisibleArea prop determines whether to coerce tooltips so that they fit within the visible area of
   * the chart. When this prop is set to true, tooltip pointers will still point to the correct data point, but the
   * center of the tooltip will be shifted to fit within the overall width and height of the svg Victory renders.
   */
  constrainToVisibleArea?: boolean;
  /**
   * The cornerRadius prop determines corner radius of the flyout container. This prop may be given as a positive number
   * or a function of datum.
   *
   * @propType number | Function
   */
  cornerRadius?: NumberOrCallback;
  /**
   * Victory components can pass a data prop to their label component. This can be useful in custom components that need
   * to make use of the entire dataset.
   */
  data?: any[];
  /**
   * Victory components can pass a datum prop to their label component. This can be used to calculate functional styles,
   * and determine text.
   */
  datum?: {};
  /**
   * The dx prop defines a horizontal shift from the x coordinate.
   *
   * @propType number | Function
   */
  dx?: NumberOrCallback;
  /**
   * The dy prop defines a vertical shift from the y coordinate.
   *
   * @propType number | Function
   */
  dy?: NumberOrCallback;
  /**
   * The events prop attaches arbitrary event handlers to the label component. This prop should be given as an object of
   * event names and corresponding event handlers. When events are provided via Victory’s event system, event handlers
   * will be called with the event, the props of the component is attached to, and an eventKey.
   *
   * @propType object
   * @example events={{onClick: (evt) => alert("x: " + evt.clientX)}}
   */
  events?: { [key: string]: (event: React.SyntheticEvent<any>) => void };
  /**
   * The flyoutComponent prop takes a component instance which will be used to create the flyout path for each tooltip.
   * The new element created from the passed flyoutComponent will be supplied with the following properties: x, y, dx, dy,
   * index, datum, cornerRadius, pointerLength, pointerWidth, width, height, orientation, style, and events.
   * Any of these props may be overridden by passing in props to the supplied component, or modified or ignored within
   * the custom component itself. If flyoutComponent is omitted, a default Flyout component will be created with props
   * described above.
   *
   * @example flyoutComponent={<Flyout x={50} y={50}/>}, flyoutComponent={<MyCustomFlyout/>}
   */
  flyoutComponent?: React.ReactElement<any>;
  /**
   * The flyoutHeight prop defines the height of the tooltip flyout. This prop may be given as a positive number or a function
   * of datum. If this prop is not set, height will be determined based on an approximate text size calculated from the
   * text and style props provided to ChartTooltip.
   *
   * @propType number | Function
   */
  flyoutHeight?: NumberOrCallback;
  /**
   * The style prop applies SVG style properties to the rendered flyout container. These props will be passed to the
   * flyoutComponent.
   *
   * @propType object
   */
  flyoutStyle?: VictoryStyleObject;
  /**
   * The flyoutWidth prop defines the width of the tooltip flyout. This prop may be given as a positive number or a
   * function of datum. If this prop is not set, flyoutWidth will be determined based on an approximate text size
   * calculated from the text and style props provided to VictoryTooltip.
   *
   * @propType number | Function
   */
  flyoutWidth?: NumberOrCallback;
  /**
   * The groupComponent prop takes a component instance which will be used to create group elements for use within
   * container elements. This prop defaults to a <g> tag.}
   */
  groupComponent?: React.ReactElement<any>;
  /**
   * This prop refers to the height of the svg that ChartCursorTooltip is rendered within. This prop is passed from
   * parents of ChartCursorTooltip, and should not be set manually. In versions before ^33.0.0 this prop referred to
   * the height of the tooltip flyout. Please use flyoutHeight instead
   *
   * Note: This prop should not be set manually.
   *
   * @private Not intended as public API and subject to change
   * @hide
   */
  height?: number;
  /**
   * The horizontal prop determines whether to plot the flyouts to the left / right of the (x, y) coordinate rather than top / bottom.
   * This is useful when an orientation prop is not provided, and data will determine the default orientation. i.e.
   * negative values result in a left orientation and positive values will result in a right orientation by default.
   */
  horizontal?: boolean;
  /**
   * The index prop represents the index of the datum in the data array.
   */
  index?: number | string;
  /**
   * The labelComponent prop takes a component instance which will be used to render each tooltip label. The new element
   * created from the passed labelComponent will be supplied with the following properties: x, y, index, datum,
   * verticalAnchor, textAnchor, style, text, and events. Any of these props may be overridden by passing in props to
   * the supplied component, or modified or ignored within the custom component itself. If labelComponent is omitted, a
   * new ChartLabel will be created with the props described above.
   *
   * @example labelComponent={<ChartLabel dy={20}/>}, labelComponent={<MyCustomLabel/>}
   */
  labelComponent?: React.ReactElement<any>;
  /**
   * Defines how the labelComponent text is horizontally positioned relative to its `x` and `y` coordinates. Valid
   * values are 'start' (default), 'middle', 'end', and 'inherit'. Note that this overrides the style prop.
   *
   * @propType string | Function
   */
  labelTextAnchor?: TextAnchorType | (() => TextAnchorType);
  /**
   * The orientation prop determines which side of the (x, y) coordinate the tooltip should be rendered on.
   * This prop can be given as “top”, “bottom”, “left”, “right”, or as a function of datum that returns one of these
   * values. If this prop is not provided it will be determined from the sign of the datum, and the value of the
   * horizontal prop.
   *
   * @propType string | Function
   */
  orientation?: OrientationOrCallback;
  /**
   * The pointerLength prop determines the length of the triangular pointer extending from the flyout. This prop may be
   * given as a positive number or a function of datum.
   *
   * @propType number | Function
   */
  pointerLength?: NumberOrCallback;
  /**
   * This prop determines which side of the tooltip flyout the pointer should originate on. When this prop is not set,
   * it will be determined based on the overall orientation of the flyout in relation to its data point, and any center
   * or centerOffset values. Valid values are 'top', 'bottom', 'left' and 'right.
   *
   * @propType string | Function
   */
  pointerOrientation?: OrientationOrCallback;
  /**
   * The pointerWidth prop determines the width of the base of the triangular pointer extending from
   * the flyout. This prop may be given as a positive number or a function of datum.
   *
   * @propType number | Function
   */
  pointerWidth?: NumberOrCallback;
  /**
   * When renderInPortal is true, rendered tooltips will be wrapped in VictoryPortal and rendered within the Portal element
   * within ChartContainer. Note: This prop should not be set to true when using a custom container element.
   */
  renderInPortal?: boolean;
  /**
   * Flag to force flyout pointer to be shown. Victory provides pointerLength=0 when using a voronoi container with
   * voronoiDimension="x"
   */
  showPointer?: boolean;
  /**
   * The style prop applies CSS properties to the rendered `<text>` element.
   */
  style?: React.CSSProperties | React.CSSProperties[];
  /**
   * The text prop defines the text ChartTooltip will render. The text prop may be given as a string, number, or
   * function of datum. When ChartLabel is used as the labelComponent, strings may include newline characters, which
   * ChartLabel will split in to separate <tspan/> elements.
   *
   * @propType number | string | Function | string[] | number[]
   */
  text?: string[] | StringOrNumberOrCallback;
  /**
   * The theme prop specifies a theme to use for determining styles and layout properties for a component. Any styles or
   * props defined in theme may be overwritten by props specified on the component instance.
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
   * This prop refers to the width of the svg that ChartCursorTooltip is rendered within. This prop is passed from
   * parents of ChartCursorTooltip, and should not be set manually. In versions before ^33.0.0 this prop referred to the
   * width of the tooltip flyout. Please use flyoutWidth instead
   *
   * Note: This prop should not be set manually.
   *
   * @private Not intended as public API and subject to change
   * @hide
   */
  width?: number;
  /**
   * The x prop defines the x coordinate to use as a basis for horizontal positioning.
   */
  x?: number;
  /**
   * The y prop defines the y coordinate to use as a basis for vertical positioning.
   */
  y?: number;
}

export const ChartCursorTooltip: React.FunctionComponent<ChartCursorTooltipProps> = ({
  constrainToVisibleArea = true,
  flyoutComponent = <ChartCursorFlyout />,
  labelTextAnchor = 'start',
  showPointer = true,
  style,
  themeColor,

  // destructure last
  theme = getTheme(themeColor),
  centerOffset = getCursorTooltipCenterOffset({ offsetCursorDimensionX: true, theme }),
  pointerOrientation = getCursorTooltipPoniterOrientation({ horizontal: true, theme }),
  pointerLength = showPointer && theme && theme.tooltip ? theme.tooltip.pointerLength : 0,
  pointerWidth = (theme.tooltip as any).pointerWidth,
  ...rest
}: ChartCursorTooltipProps) => {
  // Apply text anchor style
  const applyDefaultStyle = (customStyle: React.CSSProperties) => ({
    ...customStyle,
    textAnchor: labelTextAnchor // Workaround for VictoryTooltip.getLabelProps referencing the theme style only
  });
  const newStyle: any = Array.isArray(style) ? style.map(applyDefaultStyle) : applyDefaultStyle(style);

  const getFlyoutComponent = () => {
    let _pointerLength = Helpers.evaluateProp(pointerLength, undefined);
    if (showPointer && _pointerLength === 0) {
      _pointerLength = theme && theme.tooltip ? Helpers.evaluateProp(theme.tooltip.pointerLength, undefined) : 10;
    }
    return cloneElement(flyoutComponent, {
      pointerLength: _pointerLength,
      pointerWidth,
      ...flyoutComponent.props
    });
  };

  return (
    <ChartTooltip
      centerOffset={centerOffset}
      constrainToVisibleArea={constrainToVisibleArea}
      flyoutComponent={getFlyoutComponent()}
      labelTextAnchor={labelTextAnchor}
      pointerOrientation={pointerOrientation}
      style={newStyle}
      theme={theme}
      {...rest}
    />
  );
};
ChartCursorTooltip.displayName = 'ChartCursorTooltip';

// Note: VictoryTooltip.defaultEvents must be hoisted
hoistNonReactStatics(ChartCursorTooltip, VictoryTooltip);
