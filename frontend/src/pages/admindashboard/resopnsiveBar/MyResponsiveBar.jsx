import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import {mockBarData as data} from "./respnosiveBarGenderData"
import "./responsivebar.css"

function MyResponsiveBar() {
  return (
    <div className='bar-container'>
        <ResponsiveBar
        data={data}
        keys={[
            'male',
            'female',
        ]}
        indexBy="Governorate"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'set2' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Governorates',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-right',
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
                            itemOpacity: 1,
                            itemTextColor: "red"
                        }
                    }
                ]
            }
        ]}
        groupMode='grouped'
        role="data-visualization"
        ariaLabel="Gender Distribution by Governorate"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in gouvernate: "+e.indexValue}
    />
    </div>
  )
}

export default MyResponsiveBar