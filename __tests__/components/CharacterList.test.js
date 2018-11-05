import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import apiResult from '../__mocks__/characters';

// Component to be tested
import CharacterList from '../../src/client/CharacterList';

const characters = apiResult.data.results;

describe('<CharacterList />', () => {
  const mockOnClick = jest.fn();

  describe('return()', () => {
    test('renders the CharacterList component', () => {
      const wrapper = shallow(<CharacterList characters={characters} favCharacters={[]} onFavClicked={mockOnClick} />);
      expect(wrapper.find('.row').children()).toHaveLength(characters.length);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders the CharacterList without character props', () => {
      const wrapper = shallow(<CharacterList onFavClicked={mockOnClick} />);
      expect(wrapper.contains(<p>No characters found</p>)).toEqual(true);
    });
  });
});
