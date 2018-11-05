import React from 'react';
import { shallow, mount  } from 'enzyme';
import { Link, MemoryRouter } from "react-router-dom";
import toJson from 'enzyme-to-json';
import apiResult from '../__mocks__/characters';

// Component to be tested
import DetailedCharacter from '../../src/client/DetailedCharacter';

const character = apiResult.data.results[0];
const match = { params: { id: 0 } };

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    const p = new Promise((resolve, reject) => {
      resolve(character);
    });
    return p;
  });
});

describe('<DetailedCharacter />', () => {
  const mockOnClick = jest.fn();

  describe('render()', () => {
    test('renders the DetailedCharacter component with character', () => {
      const wrapper = shallow(
        <DetailedCharacter
          character={character}
          onFavClicked={mockOnClick}
          match={match}
          shouldFetch={false}
        />
      );
      expect(wrapper.contains(<p className="text-center text-danger"><strong>No character found</strong></p>)).toEqual(false);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('renders the DetailedCharacter component without character', () => {
      const wrapper = shallow(
        <DetailedCharacter
          character={{}}
          onFavClicked={mockOnClick}
          match={match}
          shouldFetch={false}
        />
      );
      expect(wrapper.contains(<p className="text-center text-danger"><strong>No character found</strong></p>)).toEqual(true);
    });

    describe('fetching data after mount', () => {
      test('succesfully fetching data', () => {
        const wrapper = mount(
          <MemoryRouter>
            <DetailedCharacter
              character={{}}
              onFavClicked={mockOnClick}
              match={match}
              shouldFetch={true}
            />
          </MemoryRouter>
        );
        wrapper.update();
        expect(wrapper.find(DetailedCharacter).state().character).toEqual(character);
      });
    });
  });
});
