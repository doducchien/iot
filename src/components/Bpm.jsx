import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import io from 'socket.io-client'
import { Line } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import "chartjs-plugin-streaming";

import axios from 'axios'

Bpm.propTypes = {

};

function Bpm(props) {
    const { room, info_login } = props;
    const [bpm, set_bpm] = useState('');
    const [led, set_led] = useState(false);
    const y = useRef(0)
    const [state, set_state] = useState(() => {
        return {
            labels: [],
            datasets: [
                {
                    label: 'Biểu đồ nhịp tim realtime',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,

                    data: []
                }
            ]
        }
    }
    )
    const [options, set_options] = useState(() => {
        return {
            scales: {
                xAxes: [
                    {
                        type: "realtime",
                        realtime: {
                            onRefresh: function () {
                                state.datasets[0].data.push({
                                    x: Date.now(),
                                    y: y.current

                                });
                            },
                            delay: 1000
                        }
                    }
                ]
            }
        }
    })

    console.log(y.current)
    const socket = io('http://localhost:2207', { transports: ['websocket', 'polling', 'flashsocket'] })

    useEffect(() => {

        socket.emit('join_room', room);

        socket.on('bpm_' + room, (data) => {
            y.current = data;

        })
        return () => {
            set_bpm('')
            socket.off();
        }
    }, [room])



    const toggle_led = () => {
        var body = {
            ...info_login,
            room: room
        }
        var action = led? "turn_off_led": "turn_on_led";
        axios.post('http://localhost:2206/device/' + action, body)
            .then(res => {
                if(res.data) set_led(!led);
            });
        
    }


    return (
        <div className='Bpm'>
            <Line
                data={state}
                options={options}
                // width={}
                height={120}
            />
            {y.current}
            <Button
                onClick={toggle_led}
                style={{ display: 'block', margin: 'auto' }}
                variant="contained"
                color={led? "primary": "secondary"}
                >
                    {led?'Tắt cảnh báo': 'Bật cảnh báo'}
            </Button>
        </div>
    );
}

export default Bpm;