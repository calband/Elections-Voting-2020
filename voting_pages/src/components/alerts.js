import React, { useState, useEffect } from 'react';

function Success(props) {
	const [alertStyle, setAlertStyle] = useState({ display: 'none' });

	useEffect(() => {
		if (props.title.length > 0) setAlertStyle({ display: 'block' });
		else setAlertStyle({ display: 'none' });
	}, [props.title]);

	return (
	    <div>
            <div>
                <br></br>
            </div>
            <div
                style={alertStyle}
                class="alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <strong>{props.title}</strong> {props.message}
                <button
                    type="button"
                    class="close-alert close"
                    // data-dismiss="alert"
                    // aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
	);
}

function Failure(props) {
	const [alertStyle, setAlertStyle] = useState({ display: 'none' });

	useEffect(() => {
		if (props.title.length > 0) setAlertStyle({ display: 'block' });
		else setAlertStyle({ display: 'none' });
	}, [props.title]);

	return (
	    <div>
            <div>
                <br></br>
            </div>
            <div
                style={alertStyle}
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                <strong>{props.title}</strong> {props.message}
                <button
                    type="button"
                    class="close-alert close"
                    // data-dismiss="alert"
                    // aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
	);
}

export { Success, Failure };
