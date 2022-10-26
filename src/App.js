import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: 0,
    cardAttr2: 0,
    cardAttr3: 0,
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
  };

  validator = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;
    const noBlanks = (cardName !== ''
    && cardDescription !== ''
    && cardImage !== ''
    && cardRare !== '');
    const totalCap = 210;
    const attrCap = 90;
    const lowCap = 0;
    const parsedAtt1 = parseInt(cardAttr1);
    const parsedAtt2 = parseInt(cardAttr2);
    const parsedAtt3 = parseInt(cardAttr3);
    const sum = parsedAtt1 + parsedAtt2 + parsedAtt3;
    const validCaps = (sum <= totalCap
      && parsedAtt1 <= attrCap
      && parsedAtt2 <= attrCap
      && parsedAtt3 <= attrCap
      && parsedAtt1 >= lowCap
      && parsedAtt2 >= lowCap
      && parsedAtt3 >= lowCap
    );
    const valid = (validCaps && noBlanks);
    this.setState({
      isSaveButtonDisabled: !valid,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validator);
  };

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          // hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          // onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
