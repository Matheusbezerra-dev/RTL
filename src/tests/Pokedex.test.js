import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('verifique o componente Pokedex', () => {
  it('Verifique se a página contém um heading h2 com texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexName = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(pokedexName).toBeInTheDocument();
  });

  it('é exibido o próximo pokémon da lista ao clicar em "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByTestId(/next-pokemon/i);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const secondPokemon = screen.getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });

  it('verifique se a Pokédex tem os botões de filtro ', () => {
    renderWithRouter(<App />);
    const MAGICNUMBER = 7;
    const filterPokedex = screen.getAllByTestId(/pokemon-type-button/i);
    expect(filterPokedex).toHaveLength(MAGICNUMBER);
    const psychicButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psychicButton);
    const psychicLength = screen.getAllByText(/Psychic/i);
    expect(psychicLength).toHaveLength(2);
  });

  it('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /All/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
