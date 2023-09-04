import React, { Component } from "react";
import PageHeader from "../elements/Header";
import Metric from "../components/metric";
import Words from "../components/words";
import InputArea from "./inputArea";
import Outro from "../components/outro";
import { generate } from "random-words";
// const txtgen = require("txtgen");

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            started: false,
            words: "",
            inputValue: "",
            isValidInput: false,
            activeWord: "",
            typed: "",
            lastTyped: true,
            correctlyTyped: "",
            time: 60,
            cpm: 0,
            wpm: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.editWords = this.editWords.bind(this);
        this.getWords = this.getWords.bind(this);
        this.setWords = this.setWords.bind(this);
    }
    async setWords() {
        this.setState({
            words: this.getWords(),
        });
    }
    componentDidMount() {
        this.setWords().then(() => {
            this.setState({
                activeWord: this.state.words.split(" ")[0],
            });
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.time === 0) {
            clearInterval(this.timer);
            this.playOutro();
        }
        if (prevState.inputValue !== this.state.inputValue) {
            this.validateInput().then(() => {
                this.editWords();
            });
        }
        if (prevState.typed !== this.state.typed && this.state.lastTyped) {
            this.setState({
                correctlyTyped: this.state.correctlyTyped + prevState.activeWord + " ",
                cpm:
                    this.state.correctlyTyped.length -
                    this.state.correctlyTyped.split(" ").length +
                    1,
                wpm: this.state.correctlyTyped.split(" ").length,
            });
        }
        if (this.state.words.split(" ").length < 10) {
            this.setState({
                words: this.state.words + " " + this.getWords(),
            });
        }
    }
    getWords() {
        const words = generate(15);
        return words.join(" ");
    }

    playOutro() {
        let modal = document.getElementById("outro-modal");
        let iSection = document.querySelector(".input-area");
        iSection.classList.add("hidden");
        modal.classList.toggle("hidden");
    }

    async validateInput() {
        this.setState({
            isValidInput: this.state.activeWord.indexOf(this.state.inputValue) === 0,
        });
    }

    editWords() {
        const { inputValue, activeWord, isValidInput } = this.state;
        if (isValidInput) {
            this.setState(function (prevState) {
                return {
                    words:
                        activeWord.slice(inputValue.length) +
                        this.state.words.slice(this.state.words.indexOf(" ")),
                };
            });
        }
    }

    async submitInput() {
        let nextTyped =
            this.state.inputValue === this.state.activeWord
                ? this.state.inputValue
                : this.state.inputValue.length
                ? "/*0*/" + this.state.inputValue
                : "/*0*/" + this.state.activeWord;

        this.setState(function (prevState, prevProps) {
            return {
                typed: `${prevState.typed} ${nextTyped}`,
                lastTyped: this.state.inputValue === this.state.activeWord,
            };
        });
    }
    handleChange(event) {
        if (!this.state.started) {
            this.setState({ started: true });
            this.timer = setInterval(() => {
                this.setState({
                    time: this.state.time - 1,
                });
            }, 1000);
            document.querySelector(".input-indicator").classList.add("hidden");
        }
        if (event.target.value.at(-1) !== " ") {
            this.setState({ inputValue: event.target.value });
        } else {
            this.submitInput()
                .then(() => {
                    // if(this.state.inputValue.length === 0){
                    //   this.setState(
                    //     // {words: this.state.words.slice(this.state.activeWord.length + 1)}
                    //   )
                    // }
                    this.setState({
                        words: this.state.words.trimStart(),
                    });
                })
                .then(() => {
                    // reset active word
                    this.setState({ activeWord: this.state.words.split(" ")[0] });
                    //clear inputValue
                    this.setState({ inputValue: "" });
                })
                .then(() => {
                    if (this.state.lastTyped === false) {
                        this.setState({
                            words: this.state.words.slice(
                                this.state.activeWord.length + 1
                            ),
                        });
                        this.setState({
                            activeWord: this.state.words.split(" ")[0],
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div className="container container-app ">
                <PageHeader />

                <section className="section-metrics">
                    <Metric
                        value={this.state.time}
                        unit={"seconds"}
                    />
                    <Metric
                        value={this.state.wpm}
                        unit={"words/min"}
                    />
                    <Metric
                        value={this.state.cpm}
                        unit={"chars/min"}
                    />
                </section>
                <div className="container-input-area">
                    <section className="input-area">
                        <Words
                            class={"typed"}
                            words={this.state.typed}
                        />

                        <InputArea
                            validState={this.state.isValidInput}
                            inputValue={this.state.inputValue}
                            handleChange={this.handleChange}
                        />
                        <Words
                            class={"untyped"}
                            words={this.state.words}
                        />
                    </section>
                </div>
                <footer>
                    <h4>
                        Developed by{" "}
                        <a
                            href="http://github.com/David-Main"
                            target="blank">
                            David Mainoo
                        </a>
                    </h4>
                    <h4>
                        Background obtained from{" "}
                        <a href="https://www.design.svgbackgrounds.com/">
                            svgbackgrounds
                        </a>
                    </h4>
                </footer>
                <Outro
                    wpm={this.state.wpm}
                    cpm={this.state.cpm}
                    accuracy={
                        (this.state.wpm / this.state.typed.split(" ").length).toFixed(2) *
                        100
                    }
                />
            </div>
        );
    }
}
