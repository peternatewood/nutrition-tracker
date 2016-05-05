var NutrientsTotalsForm = React.createClass({
  getInitialState: function() {
    return {
      startDate: null,
      endDate: null
    }
  },

  componentDidMount: function() {
    $(".datepicker").datepicker({
      showOn: "focus"
    });
    $("#start-date").on("change", this.handleStartDateChange);
  },

  handleStartDateChange: function(event) {
    event.preventDefault();
    console.log("input event", event);
    this.setState({
      startDate: $.datepicker.formatDate("dd/mm/yy", new Date(event.target.value))
    });
  },

  onSubmit: function(event) {
    event.preventDefault();
    $.ajax({
      data: {
        start_date: this.state.startDate,
        end_date: this.state.endDate
      },
      method: "POST",
      url: "/users/nutrients_totals",
      success: function(response) {
        var nutrients = new Array;
        for(var prop in response) {
          if(response.hasOwnProperty(prop)) {
            nutrients.push({
              name: prop,
              value: response[prop]
            });
          }
        }
        this.props.setNutrients(nutrients);
      }.bind(this),
      fail: function(response) {
        console.log("Nutrients totals failure?", response);
      }
    });
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <label>
            Start date
          </label>
          <input className="datepicker" id="start-date" type="text" value={this.state.startDate}/>
          <input type="submit" value="Search"/>
        </fieldset>
      </form>
    );
  }
});
var Nutrient = React.createClass({
  render: function() {
    return (
      <td>
        {this.props.name}
        <br/>
        {this.props.value}
      </td>
    );
  }
});
var NutrientList = React.createClass({
  render: function() {
    var nutrients = this.props.nutrients.map(function(nutrient, index) {
      return (
        <Nutrient key={index} name={nutrient.name} value={nutrient.value} />
      );
    });
    var rows = new Array;
    var numberOfRows = Math.ceil(nutrients.length / 5);
    for(var i = 0; i < numberOfRows; i++) {
      rows.push(
        <tr key={i}>
          {nutrients.splice(0, 5)}
        </tr>
      );
    }

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
})
