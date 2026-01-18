// Settings UI Cluster - Network cluster configuration
// Redesigned with modern 2025-2026 UI/UX trends

import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { ClusterUiGenesisHash } from '@/components/cluster/cluster-ui-genesis-hash'
import { ClusterUiVersion } from '@/components/cluster/cluster-ui-version'
import { Card } from '@/components/ui/card'
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/design-system'
import { useCluster } from '../cluster/cluster-provider'

export function SettingsUiCluster() {
  const { selectedCluster, clusters, setSelectedCluster } = useCluster()

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Animated.Text style={styles.sectionTitle}>Network</Animated.Text>
      </View>

      <Card variant="default" padding="md">
        {/* Cluster Info */}
        <View style={styles.infoRow}>
          <ClusterUiVersion selectedCluster={selectedCluster} />
        </View>
        <View style={styles.infoRow}>
          <ClusterUiGenesisHash selectedCluster={selectedCluster} />
        </View>

        {/* Cluster Selector */}
        <View style={styles.clusterSelector}>
          <Animated.Text style={styles.selectorLabel}>Select Network</Animated.Text>
          <View style={styles.clusterOptions}>
            {clusters.map((cluster) => {
              const isSelected = cluster.name === selectedCluster.name
              return (
                <TouchableOpacity
                  key={cluster.name}
                  onPress={() => setSelectedCluster(cluster)}
                  style={[
                    styles.clusterOption,
                    isSelected && styles.clusterOptionSelected,
                  ]}
                  activeOpacity={0.7}
                >
                  <Animated.Text
                    style={[
                      styles.clusterOptionText,
                      isSelected && styles.clusterOptionTextSelected,
                    ]}
                  >
                    {cluster.name}
                  </Animated.Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionIndicator: {
    width: 3,
    height: 18,
    backgroundColor: Colors.primary.default,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  infoRow: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  clusterSelector: {
    marginTop: Spacing.md,
  },
  selectorLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  clusterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  clusterOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface.elevated,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  clusterOptionSelected: {
    backgroundColor: Colors.primary.muted,
    borderColor: Colors.primary.default,
  },
  clusterOptionText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  clusterOptionTextSelected: {
    color: Colors.primary.light,
  },
})
