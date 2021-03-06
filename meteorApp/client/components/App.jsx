Meteor.startup(function() {
  ReactDOM.render(<App /> , document.getElementById('meteorApp'));
});

App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      tasks: Tasks.find({}).fetch()
    }
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call("addTask", text);
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <div className="container">
        <form className="new-task" onSubmit={this.handleSubmit} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks" />
        </form>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
