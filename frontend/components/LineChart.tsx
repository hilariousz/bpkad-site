// @ts-nocheck
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
Chart.defaults.font.family = 'Inter'

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.4,
  plugins: {
    title: {
      display: true,
      text: 'APBD Kab. Mahakam Ulu',
      font: {
        size: 18,
      },
    },
    legend: {
      position: 'bottom' as const,
      labels: {
        font: {
          size: 14,
        },
        usePointStyle: true,
        boxHeight: 6,
      },
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          let label = context.dataset.label || ''

          if (label) {
            label += ': '
          }

          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(context.parsed.y)
          }

          return label
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: true,
      },
    },
    y: {
      min: 0,
      ticks: {
        callback: function (value: any) {
          var ranges = [
            { divider: 1e12, suffix: 'T' },
            { divider: 1e9, suffix: 'M' },
            { divider: 1e6, suffix: 'JT' },
          ]
          function formatNumber(n: number) {
            for (var i = 0; i < ranges.length; i++) {
              if (n >= ranges[i].divider) {
                return (n / ranges[i].divider).toString() + ranges[i].suffix
              }
            }
            return n
          }
          return 'Rp.' + formatNumber(value)
        },
      },
    },
  },
}
export default function LineChart({ data }: any) {
  return <Line options={options} data={data} />
}
