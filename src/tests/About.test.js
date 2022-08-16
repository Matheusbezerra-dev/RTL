import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  it('Verifique se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Verifique se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByAltText(/Pokédex/i);
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
