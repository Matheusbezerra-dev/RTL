import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';

describe('Teste o componente FavoritePokemons', () => {
  it('Verefique se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonFound = screen.getByText(/No favorite pokemon found/i);
    expect(pokemonFound).toBeInTheDocument();
  });
});
