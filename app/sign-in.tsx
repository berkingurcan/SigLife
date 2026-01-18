import { AppView } from '@/components/app-view'
import { useAuth } from '@/components/auth/auth-provider'
import { AppConfig } from '@/constants/app-config'
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/design-system'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
  const { signIn, isLoading } = useAuth()

  const handleConnect = async () => {
    await signIn()
    router.replace('/')
  }

  return (
    <AppView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      <LinearGradient
        colors={[Colors.background.secondary, Colors.background.primary]}
        style={StyleSheet.absoluteFill}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary.default} />
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          {/* Spacer */}
          <View />

          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Logo */}
            <Animated.View entering={FadeInDown.delay(100)} style={styles.logoContainer}>
              <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            </Animated.View>

            {/* Title */}
            <Animated.Text entering={FadeInDown.delay(200)} style={styles.title}>
              {AppConfig.name}
            </Animated.Text>

            {/* Tagline */}
            <Animated.Text entering={FadeInDown.delay(300)} style={styles.tagline}>
              The Sigma Man Simulator
            </Animated.Text>

            {/* Description */}
            <Animated.Text entering={FadeInDown.delay(400)} style={styles.description}>
              Make life choices. Build your stats. Mint your achievements as NFTs on Solana.
            </Animated.Text>
          </View>

          {/* Connect Section */}
          <Animated.View entering={FadeInUp.delay(500)} style={styles.connectSection}>
            {/* Feature Pills */}
            <View style={styles.featurePills}>
              <View style={styles.pill}>
                <Animated.Text style={styles.pillText}>🎮 Life Simulator</Animated.Text>
              </View>
              <View style={styles.pill}>
                <Animated.Text style={styles.pillText}>⛓️ On-chain NFTs</Animated.Text>
              </View>
              <View style={styles.pill}>
                <Animated.Text style={styles.pillText}>📈 Track Progress</Animated.Text>
              </View>
            </View>

            {/* Connect Button */}
            <Pressable onPress={handleConnect} style={styles.connectButtonWrapper}>
              {({ pressed }) => (
                <View style={[styles.connectButton, pressed && styles.connectButtonPressed]}>
                  <LinearGradient
                    colors={[Colors.primary.default, Colors.primary.dark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                  <Animated.Text style={styles.connectButtonText}>
                    Connect Wallet
                  </Animated.Text>
                </View>
              )}
            </Pressable>

            {/* Hint */}
            <Animated.Text style={styles.hintText}>
              Connect your Solana wallet to start your sigma journey
            </Animated.Text>
          </Animated.View>
        </SafeAreaView>
      )}
    </AppView>
  )
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: Typography.fontSize['4xl'],
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.wider,
    textAlign: 'center',
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    fontFamily: 'Inter-Medium',
    color: Colors.text.accent,
    marginTop: Spacing.xs,
    letterSpacing: Typography.letterSpacing.wide,
  },
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.relaxed,
    maxWidth: 300,
  },
  connectSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  featurePills: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  pill: {
    backgroundColor: Colors.surface.elevated,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  pillText: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  connectButtonWrapper: {
    width: '100%',
  },
  connectButton: {
    height: 56,
    borderRadius: BorderRadius.base,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  connectButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  connectButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.wide,
  },
  hintText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Regular',
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
})
