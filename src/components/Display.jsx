import React from "react";
import styled from "styled-components";

const StyledDisplay = styled.div`
    background: white;
    height: 90px;
    margin: 20px;
    h5 {
        text-align: right;
        font-size: 2rem;
    }
    h6 {
        text-align: right;
        font-size: 1.4rem;
    }
`;

const Display = (props) => {
    const { formula, value, result, lastInput, operator, display } = props;
    return (
        <StyledDisplay>
            <h6>
                {display === 0 && value === "" ? 0 : formula}
                {result ? ` = ${result}` : value ? value : ""}
            </h6>
            {/* {console.log(value, value > 0)} */}

            {/* {console.log(lastInput, `is not a number ${isNaN(lastInput)}`)} */}
            <h5>{display}</h5>
        </StyledDisplay>
    );
};

export default Display;
