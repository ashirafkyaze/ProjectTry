import React, { Component } from "react";
import { Container, Header, Content, Picker, Form } from "native-base";

export default class PickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
//   onValueChange(value: string) {
//     this.setState({
//       selected: value
//     });
//   }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
          </Form>
        </Content>
      </Container>
    );
  }
}