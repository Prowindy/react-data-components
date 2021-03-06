'use strict';

var React = require('react');
var $__0=    React,PropTypes=$__0.PropTypes;

var simpleGet = function(key)  {return function(data)  {return data[key];};};
var keyGetter = function(keys)  {return function(data)  {return keys.map(function(key)  {return data[key];});};};

var isEmpty = function(value)  {return value === undefined || value === null || value === '';};

var getCellValue =
  function($__0    , row) 
           
    {var prop=$__0.prop,defaultContent=$__0.defaultContent,render=$__0.render;return !isEmpty(prop) && isEmpty(row[prop]) ? defaultContent :
      // Use the render function for the value.
      render ? render(row[prop], row) :
      // Otherwise just return the value.
      row[prop];};

var getCellClass =
  function($__0   , row, i) 
    {var prop=$__0.prop,className=$__0.className;return !isEmpty(prop) && isEmpty(row[prop]) ? 'empty-cell' :
      typeof className === 'function' ? className(row[prop], row, i) :
      className;};

function buildSortProps(col, sortBy, onSort) {
  var order = sortBy.prop === col.prop ? sortBy.order : 'none';
  var nextOrder = order === 'ascending' ? 'descending' : 'ascending';
  var sortEvent = onSort.bind(null, { prop: col.prop, order: nextOrder });

  return {
    'onClick': sortEvent,
    // Fire the sort event on enter.
    'onKeyDown': function(e)  { if (e.keyCode === 13) sortEvent(); },
    // Prevents selection with mouse.
    'onMouseDown': function(e)  {return e.preventDefault();},
    'tabIndex': 0,
    'aria-sort': order,
    'aria-label': (col.title + ": activate to sort column " + nextOrder)
  };
}



  function Table() {
    this.$Table_headers = [];
  }

  Object.defineProperty(Table.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
    // If no width was specified, then set the width that the browser applied
    // initially to avoid recalculating width between pages.
    this.$Table_headers.forEach(function(header)  {
      var thDom = React.findDOMNode(header);
      if (!thDom.style.width) {
        thDom.style.width = (thDom.offsetWidth + "px");
      }
    });
  }});

  Object.defineProperty(Table.prototype,"render",{writable:true,configurable:true,value:function() {
    var $__0=         this.props,columns=$__0.columns,keys=$__0.keys,buildRowOptions=$__0.buildRowOptions,sortBy=$__0.sortBy,onSort=$__0.onSort,headClass=$__0.headClass;

    var headers = columns.map(function(col, idx)  {
      var sortProps, order;
      // Only add sorting events if the column has a property and is sortable.
      if (typeof onSort === 'function' &&
          col.sortable !== false &&
          'prop' in col) {
        sortProps = buildSortProps(col, sortBy, onSort);
        order = sortProps['aria-sort'];
      }

      return (
        React.createElement("th", React.__spread({
          ref: function(c)  {return this.$Table_headers[idx] = c;}.bind(this), 
          key: idx, 
          style: {width: col.width, color: "white"}, 
          role: "columnheader", 
          scope: "col"}, 
          sortProps), 
          React.createElement("span", null, col.title)
        )
      );
    }.bind(this));
//{typeof order !== 'undefined' ?
//  (<span aria-hidden="true">{order==="descending"?"\u2193":"\u2191"}</span>) :
//  null}
    var getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
    //
    var rows = this.props.dataArray.map(
      function(row, rowIndex) 
        {return React.createElement("tr", React.__spread({key: getKeys(row)},  buildRowOptions(row, rowIndex)), 
          columns.map(
            function(col, i) 
              {return React.createElement("td", {key: i, className: getCellClass(col, row, i)}, 
                getCellValue(col, row)
              );}
          )
        );});

    return (
      React.createElement("table", {className: this.props.className}, 
        React.createElement("caption", {className: "sr-only", role: "alert", "aria-live": "polite"}, 
          ("Sorted by " + sortBy.prop + ": " + sortBy.order + " order")
        ), 
        React.createElement("thead", null, 
          React.createElement("tr", {className: headClass}, 
            headers
          )
        ), 
        React.createElement("tbody", {onClick: this.props.clickHandler.bind(this)}, 
          rows.length > 0 ? rows :
            React.createElement("tr", null, 
              React.createElement("td", {colSpan: columns.length, className: "text-center"}, 
              typeof this.props.dataReceived == "undefined"?
                "载入中……" : "没有可显示数据"
              )
            )
        )
      )
    );
  }});



Table.propTypes = {

  keys: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,

  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    prop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    render: PropTypes.func,
    sortable: PropTypes.bool,
    defaultContent: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  })).isRequired,

  dataArray: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])).isRequired,

  buildRowOptions: PropTypes.func,

  sortBy: PropTypes.shape({
    prop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    order: PropTypes.oneOf([ 'ascending', 'descending' ])
  }),

  onSort: PropTypes.func
};

Table.defaultProps = {
  buildRowOptions: function()  {return {};},
  sortBy: {}
};

module.exports = Table;
