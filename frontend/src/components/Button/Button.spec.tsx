import React from 'react';

import { render, fireEvent } from '../../../jest.setup';
import { Button, ButtonProps } from './Button';

const defaultProps: ButtonProps = {
  label: 'Label',
};

const onClick = jest.fn();
const defaultHrefProps = { ...defaultProps, to: '/to/test' };
const defaultButtonProps = { ...defaultProps, onClick };

describe('Button', () => {
  test('should throw error if missing to/onClick', () => {
    const result = () => render(<Button {...defaultProps} />);
    const error = 'Button must have either a link or an onClick handler';
    expect(result).toThrow(error);
  });

  test('it should render button with to as <a />', () => {
    const { queryByTestId } = render(<Button {...defaultHrefProps} />);
    const button = queryByTestId('button');
    expect(button).toBeVisible();
    expect(button).toHaveAttribute('href', '/to/test');
  });

  test('it should render button with onClick as <button />', () => {
    const { queryByTestId } = render(<Button {...defaultButtonProps} />);
    const button = queryByTestId('button');
    expect(button).toBeVisible();
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute('href');
  });

  test('it should execute onClick as <button />', () => {
    const { queryByTestId } = render(<Button {...defaultButtonProps} />);
    const button = queryByTestId('button');
    if (button) fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });

  test('it should disable button correctly on loading', () => {
    const { queryByTestId } = render(
      <Button {...defaultButtonProps} loading />,
    );

    const button = queryByTestId('button');
    expect(button).toBeDisabled();
    expect(button).not.toHaveClass('cursor-pointer');
  });
});
