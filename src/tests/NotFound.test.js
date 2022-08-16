import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('teste componente NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested', () => {
    renderWithRouter(<NotFound />);
    const NotFoundVar = screen.getByText(/Page requested not found/i);
    expect(NotFoundVar).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imagem = screen.getByAltText(/Pikachu crying/i);
    expect(imagem).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
