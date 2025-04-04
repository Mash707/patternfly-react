import { render } from '@testing-library/react';
import { Stack } from '../Stack';
import { StackItem } from '../StackItem';

test('isFilled set to true', () => {
  const { asFragment } = render(
    <Stack>
      <StackItem isFilled>Filled content</StackItem>
    </Stack>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('isFilled defaults to false', () => {
  const { asFragment } = render(
    <Stack>
      <StackItem>Basic content</StackItem>
    </Stack>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('gutter', () => {
  const { asFragment } = render(
    <Stack hasGutter>
      <StackItem>Basic content</StackItem>
    </Stack>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('component on Stack', () => {
  const { asFragment } = render(
    <Stack component="span">
      <StackItem>Basic content</StackItem>
    </Stack>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('component on StackItem', () => {
  const { asFragment } = render(
    <Stack>
      <StackItem component="span">Basic content</StackItem>
    </Stack>
  );
  expect(asFragment()).toMatchSnapshot();
});
