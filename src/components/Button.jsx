import React from "react";
import styled from "styled-components";

const StyledButtons = styled.div`
    .button {
        margin: 0;
        height: 100px;
    }

    #plus {
        position: absolute;
        height: 200px;
    }
`;

const Buttons = (props) => {
    const buttons = [
        { name: "AC", value: "ALL_CLEAR", type: "clear" },
        { name: "/", value: "/", type: "operator" },
        { name: "X", value: "*", type: "operator" },
        { name: "7", value: 7, type: "number" },
        { name: "8", value: 8, type: "number" },
        { name: "9", value: 9, type: "number" },
        { name: "-", value: "-", type: "operator" },
        { name: "4", value: 4, type: "number" },
        { name: "5", value: 5, type: "number" },
        { name: "6", value: 6, type: "number" },
        { name: "+", value: "+", id: "plus", type: "operator" },
        { name: "null", value: null },
        { name: "1", value: 1, type: "number" },
        { name: "2", value: 2, type: "number" },
        { name: "3", value: 3, type: "number" },
        { name: "null", value: null },
        { name: "C", value: "CLEAR", type: "clear" },
        { name: "0", value: 0, type: "zero" },
        { name: ".", value: ".", type: "decimal" },
        { name: "=", value: "=", type: "equal" },
    ];
    const {
        calcWidth,
        handleNumbers,
        handleOperators,
        handleClears,
        handleEquals,
        handleZeros,
        handleDecimals,
    } = props;
    return (
        <StyledButtons>
            {buttons.map(({ name, value, id, type }, index) => (
                <button
                    className="button"
                    value={value}
                    id={id}
                    key={index}
                    onClick={(event) =>
                        type === "number"
                            ? handleNumbers(event.target.value)
                            : type === "operator"
                            ? handleOperators(event.target.value)
                            : type === "clear"
                            ? handleClears(event.target.value)
                            : type === "equal"
                            ? handleEquals(event.target.value)
                            : type === "zero"
                            ? handleZeros(event.target.value)
                            : handleDecimals(event.target.value)
                    }
                    style={{
                        width: `${calcWidth / (name === "AC" ? 2 : 4)}px`,
                    }}
                >
                    {name}
                </button>
            ))}
        </StyledButtons>
    );
};

export default Buttons;
