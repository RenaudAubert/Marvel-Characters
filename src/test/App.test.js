import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../client/App';

const renderer = new ShallowRenderer();
renderer.render(<App />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <Header favChar={this.state.favCharacters} onDeleteFav={this.handleDeleteFav} />,
  <main role="main">
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          {characterList}
        </div>
      </div>
    </div>
  </main>,
  <Footer attributionText={characters.attributionText} />
]);
