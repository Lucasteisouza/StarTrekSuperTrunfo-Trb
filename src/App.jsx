import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    deck: [],
    nameFilter: '',
    rareFilter: '',
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
    const parsedAtt1 = parseInt(cardAttr1, 10);
    const parsedAtt2 = parseInt(cardAttr2, 10);
    const parsedAtt3 = parseInt(cardAttr3, 10);
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

  onSaveButtonClick = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState((prevState) => ({
      deck: [...prevState.deck, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), (() => {
      const { deck } = this.state;
      const alreadyTrunfo = deck.find((element) => element.cardTrunfo === true);
      if (alreadyTrunfo) {
        this.setState({
          hasTrunfo: true,
        });
      }
    }));
  };

  onDeleteBtnClick = ({ target }) => {
    const { deck } = this.state;
    const selectedCardName = target.parentNode.childNodes[0].innerHTML;
    const filteredDeck = deck.filter((card) => card.cardName !== selectedCardName);
    let deckHasTrunfo = false;
    if (filteredDeck.find((card) => card.cardTrunfo !== undefined)) {
      deckHasTrunfo = true;
    }
    this.setState({
      deck: filteredDeck,
      hasTrunfo: deckHasTrunfo,
    });
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
      hasTrunfo,
      deck,
      nameFilter,
      rareFilter,
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
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
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
          preview
          onDeleteBtnClick={ this.onDeleteBtnClick }
        />
        <label htmlFor="nameFilter">
          Filtrar por nome:
          <input
            type="text"
            name="nameFilter"
            id="nameFilter"
            data-testid="name-filter"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="rareFilter">
          Filtrar por raridade:
          <select
            name="rareFilter"
            id="rareFilter"
            onChange={ this.onInputChange }
            data-testid="rare-filter"
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        { deck
          .filter((card) => {
            const rarity = (rareFilter === 'todas') ? '' : rareFilter;
            if (rarity === 'raro') {
              return card.cardRare === rarity;
            } return card.cardRare.includes(rarity);
          })
          .filter((card) => card.cardName.includes(nameFilter))
          .map((card) => (<Card
            key={ card.cardName }
            cardName={ card.cardName }
            cardDescription={ card.cardDescription }
            cardAttr1={ card.cardAttr1 }
            cardAttr2={ card.cardAttr2 }
            cardAttr3={ card.cardAttr3 }
            cardImage={ card.cardImage }
            cardRare={ card.cardRare }
            cardTrunfo={ card.cardTrunfo }
            preview={ false }
            onDeleteBtnClick={ this.onDeleteBtnClick }
          />))}
      </div>
    );
  }
}

export default App;