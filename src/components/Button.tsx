import { ButtonSpinner, Button as GlueStackButton, Text } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GlueStackButton> & {
  title: string;
  variant?: 'solid' | 'outline';
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, variant = 'solid', ...rest }: Props) {
  return (
    <GlueStackButton
      {...rest}
      w="$full"
      h="$14"
      px="$4"
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor={variant === 'outline' ? '$green500' : 'transparent'}
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      rounded="$sm"
      $active-bg={variant === 'outline' ? '$gray600' : '$green500'}
      disabled={isLoading}
    >
      {isLoading ? (
        <ButtonSpinner />
      ) : (
        <Text
          color={variant === 'outline' ? '$green500' : '$white'}
          fontFamily="$heading"
          fontSize={'$sm'}
        >
          {title}
        </Text>
      )}
    </GlueStackButton>
  );
}
