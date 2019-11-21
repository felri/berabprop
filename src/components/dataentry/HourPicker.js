import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class HourPicker extends Component {
  hide = () => {
    this.props.hideDateTimePicker()

  };

  handleDatePicked = date => {
    this.props.hideDateTimePicker(date)
  };

  render() {
    return (
      <>
        <DateTimePicker
          mode={'time'}
          isVisible={this.props.isHourPickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hide}
        />
      </>
    );
  }
}