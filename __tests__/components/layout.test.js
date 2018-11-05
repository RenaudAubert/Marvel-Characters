import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import apiResult from '../__mocks__/characters';

// Component to be tested
import {
  FavButton, FavElement, Footer, Header
} from '../../src/client/layout';

const characters = apiResult.data.results;

describe('<FavButton />', () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(<FavButton characterId={1} onFavClicked={mockOnClick} />);

  describe('return()', () => {
    test('renders the FavButton component', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('onClick()', () => {
    test('successfully calls the onClick handler', () => {
      wrapper.find('button').simulate('click');
      expect(mockOnClick.mock.calls.length).toEqual(1);
    });
  });
});

describe('<FavElement />', () => {
  const [character] = characters;
  const mockOnClick = jest.fn();
  const wrapper = shallow(
    <FavElement id={character.id} name={character.name} onDeleteFav={mockOnClick} />
  );

  describe('return()', () => {
    test('renders the FavElement component', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('onClick()', () => {
    test('successfully calls the onClick handler', () => {
      wrapper.find('button').simulate('click');
      expect(mockOnClick.mock.calls.length).toEqual(1);
    });
  });
});

describe('<Footer />', () => {
  describe('return()', () => {
    test('renders the Footer component with props', () => {
      const wrapper = shallow(<Footer attributionText="test" />);
      expect(wrapper.contains(<div className="container">test</div>)).toEqual(true);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders the Footer component w/o props', () => {
      const wrapper = shallow(<Footer />);
      expect(wrapper.find('.container').children().exists()).toEqual(false);
    });
  });
});

describe('<Header />', () => {
  const mockOnClick = jest.fn();
  describe('return()', () => {
    test('renders the Header component with props', () => {
      const wrapper = shallow(<Header favCharacters={characters} onDeleteFav={mockOnClick} />);
      expect(wrapper.find('.dropdown-menu').children()).toHaveLength(characters.length);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders the Header component w/o props', () => {
      const wrapper = shallow(<Header onDeleteFav={mockOnClick} />);
      expect(wrapper.contains(<p className="text-center">No favorite characters</p>)).toEqual(true);
    });
  });
});
