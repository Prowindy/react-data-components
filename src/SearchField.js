'use strict';

var React = require('react');

class SearchField {

  constructor() {
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          type="search"
          value={this.props.value}
          onChange={this.onChange}
          size={this.props.size}
        />
      </div>
    );
  }

}

module.exports = SearchField;
