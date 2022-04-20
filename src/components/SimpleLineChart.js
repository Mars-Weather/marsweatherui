import react, { useState, useEffect, PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Text,
} from "recharts";

function SimpleLineChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="white" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                {/* <Legend /> */}
                <Line
                    type="monotone"
                    dataKey="max"
                    stroke="red"
                    // activeDot={{ r: 8 }}
                    strokeWidth={2.5}
                />
                <Line
                    type="monotone"
                    dataKey="avg"
                    stroke="LawnGreen"
                    strokeWidth={2.5}
                />
                <Line
                    type="monotone"
                    dataKey="min"
                    stroke="blue"
                    strokeWidth={2.5}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default SimpleLineChart;
