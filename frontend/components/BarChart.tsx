// @ts-nocheck
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
Chart.defaults.font.family = 'Inter'

const diff = {
  id: 'diff',
  afterDraw(chart) {
    const {
      ctx,
      data: { datasets },
      _metasets,
    } = chart

    datasets[1].data.forEach((dp, i) => {
      let realizedPercentage = Math.floor(
        (datasets[1].data[i] / datasets[0].data[i]) * 100
      )

      let barValue = `${realizedPercentage}%`
      const lineHeight = ctx.measureText('M').width

      ctx.textAlign = 'center'

      ctx.fillText(
        barValue,
        _metasets[1].data[i].x,
        _metasets[1].data[i].y - lineHeight * 1.5,
        _metasets[1].data[i].width
      )
    })
  },
}
export const options = {
  responsive: true,
  mantainAspectRatio: false,
  plugins: {
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
    title: {
      display: false,
      text: 'Realisasi Anggaran T.A 2022',
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
  interaction: {
    mode: 'index',
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        minRotation: 35,
      },
    },
    y: {
      min: 0,
      ticks: {
        callback: function (value) {
          var ranges = [
            { divider: 1e12, suffix: 'T' },
            { divider: 1e9, suffix: 'M' },
            { divider: 1e6, suffix: 'JT' },
          ]
          function formatNumber(n) {
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

export default function VBarChart({ data }: any) {
  return <Bar options={options} data={data} plugins={[diff]} />
}
