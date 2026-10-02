import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  ScatterChart,
  MapChart,
  PieChart,
  CustomChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkAreaComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  ScatterChart,
  MapChart,
  PieChart,
  CustomChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkAreaComponent,
  CanvasRenderer,
]);

export default echarts;
export * from 'echarts/core';
export { echarts };
