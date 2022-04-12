import React from 'react';

import { renderWithLayout, fireEvent } from '../../jest.setup';
import { Button, ButtonProps } from '../Button';

const defaultProps: ButtonProps = {
  label: 'Label',
};

const onClickHandler = jest.fn();
const defaultHrefProps = { ...defaultProps, href: '/to/test' };
const defaultButtonProps = { ...defaultProps, onClickHandler };

describe('Button', () => {
  test('it should render nothing on missing href/onClick', () => {
    const { queryByText } = renderWithLayout(<Button {...defaultProps} />);
    expect(queryByText('Label')).not.toBeInTheDocument();
  });

  test('it should render button with href as <a />', () => {
    const { queryByText } = renderWithLayout(<Button {...defaultHrefProps} />);
    expect(queryByText('Label')).toBeVisible();
    expect(queryByText('Label')).toHaveAttribute('role', 'button');
    expect(queryByText('Label')).toHaveAttribute('href', '/to/test');
  });

  test('it should render button with onClick as <button />', () => {
    const { queryByText } = renderWithLayout(
      <Button {...defaultButtonProps} />,
    );
    expect(queryByText('Label')).toBeVisible();
    expect(queryByText('Label')).not.toBeDisabled();
    expect(queryByText('Label')).not.toHaveAttribute('href');
  });

  test('it should execute onClickHandler as <button />', () => {
    const { getByText } = renderWithLayout(<Button {...defaultButtonProps} />);
    fireEvent.click(getByText('Label'));
    expect(onClickHandler).toBeCalledTimes(1);
  });

  test('it should render classes correctly', () => {
    const { queryByText, rerender } = renderWithLayout(
      <Button {...defaultButtonProps} />,
    );
    expect(queryByText('Label')).toHaveClass('call-to-action shining-button');

    rerender(<Button {...defaultButtonProps} disabled />);
    expect(queryByText('Label')).toHaveClass('call-to-action');

    rerender(<Button {...defaultButtonProps} disabled className="custom" />);
    expect(queryByText('Label')).toHaveClass('call-to-action custom');
  });

  test('it should disable button correctly', () => {
    const { queryByText, rerender } = renderWithLayout(
      <Button {...defaultButtonProps} disabled />,
    );
    expect(queryByText('Label')).toBeDisabled();
    expect(queryByText('Label')).toHaveClass('call-to-action');

    rerender(<Button {...defaultHrefProps} disabled />);
    expect(queryByText('Label')).not.toBeDisabled();
    expect(queryByText('Label')).toHaveClass('call-to-action');
  });

  test('it should render icon correctly', () => {
    const { queryByText, rerender } = renderWithLayout(
      <Button {...defaultButtonProps} />,
    );
    expect(queryByText('Label')).toBeInTheDocument();
    expect(queryByText('Icon')).not.toBeInTheDocument();

    rerender(<Button {...defaultButtonProps} icon={<span>Icon</span>} />);
    expect(queryByText('Label')).toBeInTheDocument();
    expect(queryByText('Icon')).toBeInTheDocument();
  });

  test('it should render background color correctly', () => {
    const { queryByText, rerender } = renderWithLayout(
      <Button {...defaultButtonProps} />,
    );
    expect(queryByText('Label')).toHaveStyle('background-color: rgb(0, 0, 0)');

    rerender(<Button {...defaultButtonProps} color="red" />);
    expect(queryByText('Label')).toHaveStyle('background-color: red');
  });

  test('it should render size correctly', () => {
    const { queryByText, rerender } = renderWithLayout(
      <Button {...defaultButtonProps} />,
    );
    expect(queryByText('Label')).toHaveStyle('width: auto');
    expect(queryByText('Label')).toHaveStyle('max-width: 18rem');

    rerender(<Button {...defaultButtonProps} fixedWidth="12rem" />);
    expect(queryByText('Label')).toHaveStyle('width: 12rem');
    expect(queryByText('Label')).toHaveStyle('max-width: unset');

    rerender(<Button {...defaultButtonProps} fullWidth />);
    expect(queryByText('Label')).toHaveStyle('width: 100%');
    expect(queryByText('Label')).toHaveStyle('max-width: unset');

    rerender(<Button {...defaultButtonProps} fullWidth fixedWidth="12rem" />);
    expect(queryByText('Label')).toHaveStyle('width: 12rem');
    expect(queryByText('Label')).toHaveStyle('max-width: unset');
  });
});
