import React from 'react'

function Outro(props) {
    const {wpm, cpm, accuracy } = props;
    return (
    <div className="outro-background hidden" id="outro-modal">    
            <section >
                <div className="results">
                    <p className="wpm result"><span className="value">{wpm}</span><span className="unit">words/min</span></p>
                    <p className="cpm result"><span className="value">{cpm}</span><span className="unit">chars/min</span></p>
                    <p className="accuracy result"><span className="value">{accuracy}%</span><span className="unit">accuracy</span></p>
                </div>
                <button className="btn btn-reload" onClick={() => {window.location.reload()}}>try again</button>
            </section>
    </div>
    )
}

export default Outro
