import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifique se é renderizado o componente Pokemon', () => {
  it('Verifique se é renderizado o nome', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByText(/Pikachu/i);
    expect(pokemonName[0]).toBeInTheDocument();
  });

  it('verifique se é renderizado o tipo', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getAllByText(/Electric/i);
    expect(pokemonType[0]).toBeInTheDocument();
  });

  it('verifique se é renderizado o peso médio do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText(/6.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
  });

  it('verifique se é renderizado a imagem do pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pokemonImg.src).toBe(pokemon);
  });

  it('verifique se é renderizado link de Detalhe do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('verifique se é renderizado pokémon no favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const logoUrl = 'http://localhost/star-icon.svg';
    history.push('/pokemons/25');
    const checkStar = screen.getByRole(/checkbox/i);
    userEvent.click(checkStar);
    const favoritePokemon = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    expect(favoritePokemon.src).toBe(logoUrl);
    const pokemonType = screen.getByText('Electric');
    expect(pokemonType).toBeInTheDocument();
  });
});
