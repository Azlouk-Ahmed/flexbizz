import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

function Barchart({ data }) {
  const theme = {
    axis: {
        ticks: {
            text: {
                fontFamily: "'Poppins', sans-serif",
                fontSize: 12,
            },
        },
        legend: {
            text: {
                fontFamily: "'Poppins', sans-serif",
                fontSize: 14,
            },
        },
    },
    legends: {
        text: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: 12,
        },
    },
    tooltip: {
        container: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: 12,
        },
    },
  };
  // Define the color mapping for each key
  const colors = { freelancer: '#8B54FF', client: '#ddafff' };

  return (
    <div className="chart--container">
      members count by each gouvernment
      <ResponsiveBar
        data={data}
        keys={['freelancer', 'client']}
        indexBy="governorate"
        margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ id }) => colors[id]} // Use the custom color function
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Governorate',
          legendPosition: 'middle',
          legendOffset: 50,
          format: value => value.length > 10 ? `${value.slice(0, 7)}...` : value,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]]
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        theme={theme} // Apply the theme here
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => `${e.id}: ${e.formattedValue} in governorate: ${e.indexValue}`}
      />
    </div>
  )
}

export default Barchart
