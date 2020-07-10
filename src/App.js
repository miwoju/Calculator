import React, { Component } from "react";
import styled from "styled-components";

import Display from "./components/Display.jsx";
import Buttons from "./components/Button.jsx";

const StyledApp = styled.div`
    background: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100vh;
    .calculator {
        display: flex;
        flex-direction: column;
        background: lightsalmon;
    }
`;

/**
 * TODO: remove lastInput
 * Clicking numbers and zero after equals, bugs up
 * !How about, formula display is {formula + value}, and when operator is clicked, attach value to formula and reset value
 */

// const decimalRegex = /(\.)/g;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: "",
            value: "",
            result: "",
            lastInput: "",
            operator: "",
            display: 0,
            hasDecimal: false,
            startingZero: true,
        };

        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.handleClears = this.handleClears.bind(this);
        this.handleEquals = this.handleEquals.bind(this);
        this.handleZeros = this.handleZeros.bind(this);
        this.handleDecimals = this.handleDecimals.bind(this);
    }
    handleNumbers(value) {
        let newValue = this.state.value;
        let newFormula = this.state.formula;

        if (this.state.value === "0") {
            newValue = value;
        }

        // if (this.state.value === "0") {
        //     newFormula = value;
        // }

        if (this.state.value !== "0") {
            newValue = this.state.value + value;
        }
        // if (this.state.formula !== "0") {
        //     newFormula = this.state.formula + value;
        // }

        if (!this.state.result) {
            this.setState({
                // formula: newFormula,
                value: newValue,
                result: "",
                display: newValue,
                // operator: "",
            });
        }
    }

    handleOperators(value) {
        /** Prevents duplicate operator signs and only allows operation if value isn't 0 */
        let initFormula = this.state.formula;

        if (initFormula === "") {
            initFormula = this.state.value + value;
        } else if (this.state.result) {
            initFormula = this.state.formula + value;
        } else {
            initFormula = this.state.formula + this.state.value + value;
        }

        if (this.state.value) {
            this.setState({
                formula: initFormula,
                //Replaces number with operator sign for display purposes
                value: "",
                result: "",
                operator: value,
                display: value,
                hasDecimal: false,
            });
        }
    }

    //DONE
    handleClears(value) {
        this.setState({
            value: "",
            result: "",
            hasDecimal: false,
            operator: "",
            display: 0,
        });
        if (value === "ALL_CLEAR") {
            this.setState({
                formula: "",
            });
        }
    }

    handleEquals(value) {
        if (this.state.result) {
            this.setState({
                formula:
                    "(" +
                    this.state.formula +
                    ")" +
                    this.state.operator +
                    this.state.value,
                result: eval(
                    this.state.formula + this.state.operator + this.state.value
                ),
            });
        }
        if (!this.state.result) {
            this.setState({
                formula: this.state.formula + this.state.value,
                // value: "",
                result: eval(this.state.formula + this.state.value),
                display: eval(this.state.formula + this.state.value),
            });
        }
    }

    handleZeros(zero) {
        //!DECIMAL CHECK
        //If value exists or isn't already 0
        // if (this.state.value > 0 || decimalRegex.test(this.state.value)) {

        // let newValue = this.state.value;
        // let newFormula = this.state.formula;

        let impliedZero =
            this.state.value !== "0" || this.state.hasDecimal ? zero : "";

        // if (this.state.formula === "") {
        //     // newFormula = zero;
        // }

        if (this.state.value === "") {
            // newFormula = this.state.formula + zero;
            // newValue = zero;
        }

        if (this.state.hasDecimal) {
            // newFormula = this.state.formula + zero;
            // newValue = this.state.value + zero;
        }

        if (!this.state.result) {
            this.setState({
                operator: false,
                result: "",
                // formula: this.state.formula + impliedZero,
                value: this.state.value + impliedZero,
                display: this.state.value + impliedZero,
            });
        }

        //Only works if left down here because "0." counts as 0
        // if (this.state.hasDecimal) {
        //     this.setState({
        //         formula: this.state.formula + zero,
        //         value: this.state.value + zero,
        //     });
        // }
    }

    handleDecimals(decimal) {
        // console.log(this.state.formula[this.state.formula.length - 1]);
        //!Add absolute for negative number
        let impliedZero =
            // this.state.operator || this.state.value === 0 ? 0 : "";
            this.state.value === "" ? 0 : "";

        //Prevent more than 1 decimals or adding decimal after resulted
        if (!this.state.hasDecimal && !this.state.result) {
            this.setState({
                // formula: this.state.formula + impliedZero + decimal,
                value: this.state.value + impliedZero + decimal,
                display: this.state.value + impliedZero + decimal,
                operator: "",
                hasDecimal: true,
            });
        }
    }

    setValue(value) {
        this.setState({
            formula: this.state.formula + value,
            value: this.state.value + value,
            result: "",
        });
    }

    render() {
        const calcWidth = "500";
        const calcHeight = "650";

        const {
            formula,
            value,
            result,
            lastInput,
            operator,
            display,
        } = this.state;
        return (
            <StyledApp>
                {/* {console.log(!isNaN(lastInput))} */}
                {console.log(this.state.value)}
                <div
                    style={{
                        width: `${calcWidth}px`,
                        height: `${calcHeight}px`,
                    }}
                    className="calculator"
                >
                    <Display
                        formula={formula}
                        value={value}
                        result={result}
                        lastInput={lastInput}
                        operator={operator}
                        display={display}
                    />
                    <Buttons
                        calcWidth={calcWidth}
                        handleNumbers={this.handleNumbers}
                        handleOperators={this.handleOperators}
                        handleClears={this.handleClears}
                        handleEquals={this.handleEquals}
                        handleZeros={this.handleZeros}
                        handleDecimals={this.handleDecimals}
                    />
                </div>
            </StyledApp>
        );
    }
}

export default App;
