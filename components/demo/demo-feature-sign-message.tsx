// Demo Feature Sign Message - Message signing test
// Redesigned with modern 2025-2026 UI/UX trends

import { PublicKey } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useMobileWallet } from '@wallet-ui/react-native-web3js'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import Animated from 'react-native-reanimated'
import Snackbar from 'react-native-snackbar'

import { Button } from '@/components/ui/button'
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/design-system'
import { ellipsify } from '@/utils/ellipsify'

function useSignMessage({ address }: { address: PublicKey }) {
  const { signMessage } = useMobileWallet()
  return useMutation({
    mutationFn: async (input: { message: string }) => {
      return signMessage(new TextEncoder().encode(input.message)).then((signature) => signature.toString())
    },
  })
}

export function DemoFeatureSignMessage({ address }: { address: PublicKey }) {
  const signMessage = useSignMessage({ address })
  const [message, setMessage] = useState('Hello world')

  const handleSignMessage = () => {
    signMessage
      .mutateAsync({ message })
      .then(() => {
        console.log(`Signed message: ${message} with ${address.toString()}`)
        Snackbar.show({
          text: `Signed message with ${ellipsify(address.toString(), 8)}`,
          duration: Snackbar.LENGTH_SHORT,
        })
      })
      .catch((err) => console.log(`Error signing message: ${err}`, err))
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.description}>
        Sign a message with your connected wallet to verify ownership.
      </Animated.Text>

      <View style={styles.inputContainer}>
        <Animated.Text style={styles.inputLabel}>Message</Animated.Text>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter message to sign..."
          placeholderTextColor={Colors.text.muted}
          selectionColor={Colors.primary.default}
        />
      </View>

      {signMessage.isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.primary.default} />
          <Animated.Text style={styles.loadingText}>Signing...</Animated.Text>
        </View>
      ) : (
        <Button
          title="Sign Message"
          onPress={handleSignMessage}
          variant="primary"
          size="lg"
          disabled={signMessage.isPending || message?.trim() === ''}
        />
      )}

      {signMessage.isError && (
        <View style={styles.errorContainer}>
          <Animated.Text style={styles.errorText}>
            {signMessage.error.message}
          </Animated.Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
  },
  inputContainer: {
    gap: Spacing.sm,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  textInput: {
    backgroundColor: Colors.surface.elevated,
    borderWidth: 1,
    borderColor: Colors.border.default,
    borderRadius: BorderRadius.base,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  errorContainer: {
    backgroundColor: Colors.danger.muted,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.danger.default,
  },
})
