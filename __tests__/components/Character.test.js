import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import apiResult from '../__mocks__/characters';

// Component to be tested
import Character from '../../src/client/Character';

const character = apiResult.data.results[0];

describe('<Character />', () => {
  const mockOnClick = jest.fn();

  describe('return()', () => {
    test('renders the Character component', () => {
      const wrapper = shallow(<Character character={character} onFavClicked={mockOnClick} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders the Character component without description', () => {
      let character2 = character;
      character2.description = "";
      const wrapper = shallow(<Character character={character2} onFavClicked={mockOnClick} />);
      expect(wrapper.exists('.text-danger')).toEqual(true);
    });
  });
});
