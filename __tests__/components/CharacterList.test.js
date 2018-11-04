import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import apiResult from '../__mocks__/characters';

// Component to be tested
import CharacterList from '../../src/client/CharacterList';

describe('<CharacterList />', () => {
  const mockOnClick = jest.fn();
  const characters = apiResult.data.results;

  describe('return()', () => {
    test('renders the CharacterList component', () => {
      const wrapper = shallow(<CharacterList characters={characters} favCharacters={[]} onFavClicked={mockOnClick} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('renders without characters', () => {
      test('renders the CharacterList component', () => {
        const wrapper = shallow(<CharacterList characters={[]} favCharacters={[]} onFavClicked={mockOnClick} />);
        expect(wrapper.contains(<p>No characters found</p>)).toEqual(true);
      });
    });
  });
});
