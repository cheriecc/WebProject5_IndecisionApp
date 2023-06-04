import React from 'react'
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'

class IndecisionApp extends React.Component {
    
    state = {
        options: [],
        selectedOption: undefined
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({ options }))
            }    
        } catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    }

    handleRemoveOne = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((o) => o !== option)
        }))
    }

    handlePick = () => {
        const option = this.state.options[Math.floor(Math.random() * this.state.options.length)]
        this.setState(() => ({ selectedOption: option }))
    }

    handleCloseModal = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This item already exists'
        }
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className='container'>
                    <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                    <div className='widget'>
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleRemoveOne={this.handleRemoveOne}/>
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                    <OptionModal selectedOption={this.state.selectedOption} handleCloseModal={this.handleCloseModal}/>
                </div>
            </div>
        )
    }
}

export default IndecisionApp