import { PieChart, Pie, Cell, Tooltip } from "recharts"
import {useMemo} from "react"
import "./Piechart.css"
import { getPieData } from "../../utils.js"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function Piechart({ data, title, dataKey }) {
  let chartData = useMemo(()=>getPieData(data, dataKey),[data,dataKey])
  return (
    <div className="piechart">
      <h3 className="piechartTitle">{title}</h3>
      <PieChart width={400} height={400} aspect={1 / 1}>
        <Pie
          data={chartData}
          cx={200}
          cy={220}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={170}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  )
}

export default Piechart
