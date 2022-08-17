import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifique o componente PokemonDetails', () => {
  it('Verifique se as informações do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const details = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(details).toBeInTheDocument();
    const headingH2 = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(headingH2).toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Verefique que tem a localização do Pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const headingH2 = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(headingH2).toBeInTheDocument();
    const imagemLocation = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imagemLocation).toHaveLength(2);
    const imagem1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const imagem2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imagemLocation[0].src).toBe(imagem1);
    expect(imagemLocation[1].src).toBe(imagem2);
  });

  it('Verifica se o usuario pode favoritar o pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const logoUrl = 'http://localhost/star-icon.svg';
    history.push('/pokemons/25');
    const checkStar = screen.getByRole(/checkbox/i);
    expect(checkStar).toBeInTheDocument();
    userEvent.click(checkStar);
    const favoritePokemon = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    expect(favoritePokemon.src).toBe(logoUrl);
  });
});
