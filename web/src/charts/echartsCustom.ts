import * as echarts from 'echarts/core';
import {
  MapChart,
  BarChart,
  LineChart,
  ScatterChart,
  PieChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  MapChart,
  BarChart,
  LineChart,
  ScatterChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

export * from 'echarts/core';
export { echarts };
export default echarts;
