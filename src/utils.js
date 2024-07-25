export function getData(data, parent, child) {
  function findRepeated(parent, child, results) {
    // console.log(parent, child, results)
    if (child in results[parent]) {
      results[parent][child] += 1
    } else {
      results[parent][child] = 1
    }
    // console.log(results)
    return results       
  }

  function extractStatistics(data, objKey) {
    let statistics = {}

    for (let key in data) {
      statistics[key] = []
      for (let childkey in data[key]) {
        let tempdata = { [objKey]: childkey, value: data[key][childkey] }
        statistics[key].push(tempdata)
      }
    }
    // console.log(statistics)
    return statistics
  }
  // result looks like this
  // {
  //   'Andaman & Nicobar': { DAP: 5, MAP: 5, MOP: 5, NPK: 5, TSP: 5, UREA: 5, SSP: 5 },
  //   'Andhra Pradesh': { DAP: 5, MAP: 5, MOP: 5, NPK: 5, TSP: 5, UREA: 5, SSP: 5 },
  //   'Arunachal Pradesh': { DAP: 5, MAP: 5, MOP: 5, NPK: 5, TSP: 5, UREA: 5, SSP: 5 },
  // }

  let states = {}
  // let parent = "state"
  // let child = "product"
  for (let obj of data) {
    // console.log(obj,states,obj[parent], states.hasOwnProperty(obj[parent]))
    if (!states.hasOwnProperty(obj[parent])) {
      // console.log(parent)
      states[obj[parent]] = {}
      states = findRepeated(obj[parent], obj[child], states)
    } else {
      
      states = findRepeated(obj[parent], obj[child], states)
    }
  }
  // data to be exported
  let finaldata = extractStatistics(states, child)

  return finaldata
}

export function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })
}

export function getPieData(data, valueData) {
  console.log(valueData)
  const chartData = data.reduce((carry, item) => {
    const { product, [valueData]: req } = item

    if (!(product in carry)) {
      carry[product] = 0
    }

    carry[product] += parseFloat(req)
    return carry
  },{})

  const finalData = [...Object.entries(chartData)]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => {
      return { name: entry[0],value: entry[1],}
})
    console.log(finalData)
  return finalData
}
