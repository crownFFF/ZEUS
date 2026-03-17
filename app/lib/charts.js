export const one_temp = {
  series: [
    {
      type: "gauge",
      center: ["50%", "70%"],
      startAngle: 200,
      endAngle: -20,
      min: -20,
      max: 40,
      splitNumber: 12,
      itemStyle: {
        color: "#FFAB91",
      },
      progress: {
        show: true,
        width: 30,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 30,
        },
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: "#fff",
        },
      },
      splitLine: {
        distance: -52,
        length: 12,
        lineStyle: {
          width: 3,
          color: "#fff",
        },
      },
      axisLabel: {
        show:false,
        distance: -9,
        color: "#fff",
        fontSize: "1.2rem",
      },
      anchor: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: "70%",
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, "-15%"],
        fontSize:"2rem",
        fontWeight: "bolder",
        formatter: "{value}°C",
        color: "inherit",
      },
      data: [
        {
          value: 20,
        },
      ],
    },
    {
      type: "gauge",
      center: ["50%", "70%"],
      startAngle: 200,
      endAngle: -20,
      min: -20,
      max: 40,
      itemStyle: {
        color: "#FD7347",
      },
      progress: {
        show: true,
        width: 5,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: 20,
        },
      ],
    },
  ],
}
export const two_temp = {
  series: [
    {
      type: "gauge",
      center: ["50%", "35%"],
      startAngle: 200,
      endAngle: -20,
      min: -20,
      max: 40,
      radius: 80,
      splitNumber: 12,
      itemStyle: {
        color: "#FFAB91",
      },
      progress: {
        show: true,
        width: 30,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 30,
        },
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: "#fff",
        },
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: "#fff",
        },
      },
      axisLabel: {
        distance: -10,
        color: "#fff",
        fontSize: "1rem",
      },
      anchor: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: "70%",
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, "-15%"],
        fontSize: "1.5rem",
        fontWeight: "bolder",
        formatter: "{value}°C",
        color: "inherit",
      },
      data: [
        {
          value: 20,
        },
      ],
    },
    {
      type: "gauge",
      center: ["50%", "35%"],
      startAngle: 200,
      endAngle: -20,
      min: -20,
      max: 40,
      radius: 80,
      itemStyle: {
        color: "#FD7347",
      },
      progress: {
        show: true,
        width: 8,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: 20,
        },
      ],
    },
    {
      type: "gauge",
      center: ["50%", "75%"],
      startAngle: 200,
      endAngle: -20,
      min: 10,
      max: 130,
      radius: 80,
      splitNumber: 12,
      itemStyle: {
        color: "#FFAB91",
      },
      progress: {
        show: true,
        width: 30,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 30,
        },
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: "#fff",
        },
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: "#fff",
        },
      },
      axisLabel: {
        distance: -10,
        color: "#fff",
        fontSize: "1rem",
      },
      anchor: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: "70%",
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, "-15%"],
        fontSize: "1.5rem",
        fontWeight: "bolder",
        formatter: "{value}°F",
        color: "inherit",
      },
      data: [
        {
          value: 20,
        },
      ],
    },
    {
      type: "gauge",
      center: ["50%", "75%"],
      startAngle: 200,
      endAngle: -20,
      min: 10,
      max: 130,
      radius: 80,
      itemStyle: {
        color: "#FD7347",
      },
      progress: {
        show: true,
        width: 8,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: 20,
        },
      ],
    },
  ],
}