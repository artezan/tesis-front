export const chartSettings1 = {
    chartType: 'line',
    colors: [
        {
            borderColor: '#42a5f5',
            backgroundColor: '#42a5f5',
            pointBackgroundColor: '#1e88e5',
            pointHoverBackgroundColor: '#1e88e5',
            pointBorderColor: '#ffffff',
            pointHoverBorderColor: '#ffffff'
        }
    ],
    options: {
        spanGaps: false,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 32,
                left: 32,
                right: 32
            }
        },
        elements: {
            point: {
                radius: 4,
                borderWidth: 2,
                hoverRadius: 4,
                hoverBorderWidth: 2
            },
            line: {
                tension: 0
            }
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        tickMarkLength: 18
                    },
                    ticks: {
                        fontColor: '#ffffff',
                    }
                }
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        min: 1
                    }

                }
            ]
        },
        plugins: {
            filler: {
                propagate: false
            },
            xLabelsOnTop: {
                active: true
            }
        }
    }
};

export const chartSettings2 = {
    chartType: 'bar',
    colors: [
        {
            backgroundColor: 'rgba(66,165,245, .5)',
            borderColor: 'rgba(66,165,245, 1)',
            borderWidth: 3,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2196F3',
            pointBackgroundColor: '#2196F3',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(66,165,245, .5)',
            pointHoverBorderColor: 'rgba(66,165,245,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10
        }
    ],
    options: {
        borderCapStyle: 'round',
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0
                    }
                }
            ],
            xAxes: [
                {
                    display: false
                }
            ]
        }
    }
};

export const chartSettings3 = {
    conversion: {
        value: 492,
        ofTarget: 13
    },
    chartType: 'bar',
    colors: [
        {
            borderColor: '#42a5f5',
            backgroundColor: '#42a5f5'
        }
    ],
    options: {
        spanGaps: false,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 24,
                left: 16,
                right: 16,
                bottom: 16
            }
        },
        scales: {
            xAxes: [
                {
                    display: false
                }
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        min: 1
                    }
                }
            ]
        }
    }
};

export const chartSettings4 = {
    chartType: 'bar',
    colors: [
        {
            borderColor: '#311B92',
            backgroundColor: '#311B92'
        }
    ],
    options: {
        spanGaps: false,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 24,
                left: 16,
                right: 16,
                bottom: 16
            }
        },
        scales: {
            xAxes: [
                {
                    display: false
                }
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        min: 1
                    }
                }
            ]
        }
    }
};

export const chartSettings5 = {
    chartType: 'bar',
    colors: [
        {
            borderColor: '#311B92',
            backgroundColor: '#311B92'
        }
    ],
    options: {
        spanGaps: false,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 24,
                left: 16,
                right: 16,
                bottom: 16
            }
        },
        scales: {
            xAxes: [
                {
                    display: false
                }
            ],
            yAxes: [
                {
                    display: false,
                    ticks: {
                        min: 1
                    }
                }
            ]
        }
    }
};
export const chartSettings6 = {
    chartType: 'line',
    colors: [
        {
            backgroundColor: 'rgba(66,165,245, .5)',
            borderColor: 'rgba(66,165,245, 1)',
            borderWidth: 3,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2196F3',
            pointBackgroundColor: '#2196F3',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(66,165,245, .5)',
            pointHoverBorderColor: 'rgba(66,165,245,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10
        }
    ],
    options: {
        spanGaps: false,
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 2,
                borderWidth: 1,
                hoverRadius: 2,
                hoverBorderWidth: 1
            },
            line: {
                tension: 0
            }
        },
        layout: {
            padding: {
                top: 24,
                left: 16,
                right: 16,
                bottom: 16
            }
        },
        scales: {
        //     xAxes: [
        //         {
        //             display: false
        //         }
        //     ],
            yAxes: [
                {
                    display: true,
                    ticks: {
                        min: 0,
                        // max: 500
                    }
                }
            ]
        }
    }
};
export const chartSettings7 = {
    chartType: 'bar',
    colors: [
        {
            backgroundColor: 'rgba(60, 66,82, .5)',
            borderColor: 'rgba(60, 66,82, 1)',
            borderWidth: 3,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3C4252',
            pointBackgroundColor: '#3C4252',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(60, 66,82, .5)',
            pointHoverBorderColor: 'rgba(60, 66,82,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10
        }
    ],
    options: {
        borderCapStyle: 'round',
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0
                    }
                }
            ]
        }
    }
};
export const chartSettings8 = {
    chartType: 'bar',
    colors: [
        {
            backgroundColor: 'rgba(60, 66,82, .5)',
            borderColor: 'rgba(60, 66,82, 1)',
            borderWidth: 3,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3C4252',
            pointBackgroundColor: '#3C4252',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(60, 66,82, .5)',
            pointHoverBorderColor: 'rgba(60, 66,82,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10
        }
    ],
    options: {
        borderCapStyle: 'round',
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0
                    }
                }
            ],
            xAxes: [
                {
                    display: false
                }
            ]
        }
    }
};
