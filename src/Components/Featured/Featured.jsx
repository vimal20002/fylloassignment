import { data } from "../../result.js"
import "./Featured.css"
import Chart from "../Chart/Chart"
import Bigchart from "../Bigchart"
import Piechart from "../Piechart"

const pieMeta = [
{
  title:"Top 5 Required products",
  dataKey:"requirement_in_mt_"
},
{
  title:"Top 5 Available products",
  dataKey:"availability_in_mt_"
}
];
const barMeta = [
  {
    title:"State wise product",
    parent:"state"
  },
  {
    title:"Year wise product",
    parent:"_year"
  },
  {
    title:"Month wise product",
    parent:"month"
  },
];
function Featured() {
  // console.log(data)
  return (
    <div className="featured">
      
      <div className="featuredpiechart">
        {
          pieMeta.map((item)=>{

            return <Piechart
            key={item.title}
              data={data}
              title={item.title}
              dataKey={item.dataKey}
            />
          })
        }
      </div>
      <Bigchart
        data={data}
        title="Product Availability and Requirements"
        grid

      />
      <div className="featuredItem">
        {
          barMeta.map((item)=>{
            return <div key={item.title} className="widgetsm">
          <Chart
            data={data}
            title={item.title}
            grid
            parent={item.parent}
            child="product"
            defaultValue={data[0]}
          />
        </div>
          })
        }
      </div>
    </div>
  )
}

export default Featured
