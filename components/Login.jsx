import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Floating decorative dot component
function FloatingDot({
  size,
  color,
  style,
  delay = 0,
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 2000 + delay,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 2000 + delay,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          position: 'absolute',
          transform: [{ translateY }],
        },
        style,
      ]}
    />
  );
}

export default function OnboardingScreen() {
  

  return (
    <View style={styles.container}>
      {/* Purple blob top-left */}
      <View style={styles.blobTopLeft} />

      {/* Purple blob bottom-right */}
      <View style={styles.blobBottomRight} />

      {/* Main content card */}
      <View style={styles.card}>
        {/* Icon section */}
        <View style={styles.iconSection}>
          {/* Decorative floating dots around the icon */}
          <FloatingDot size={10} color="#FF6B6B" style={{ top: 10, left: 20 }} delay={200} />
          <FloatingDot size={7} color="#FFC107" style={{ top: 30, left: 5 }} delay={400} />
          <FloatingDot size={12} color="#E0DDFF" style={{ top: 5, right: 25 }} delay={100} />
          <FloatingDot size={8} color="#6C63FF" style={{ top: 50, right: 10 }} delay={600} />
          <FloatingDot size={6} color="#A89DFF" style={{ bottom: 10, left: 30 }} delay={300} />
          <FloatingDot size={9} color="#FF6B6B" style={{ bottom: 5, right: 35 }} delay={500} />
          <FloatingDot size={5} color="#FFC107" style={{ bottom: 20, right: 15 }} delay={150} />

          {/* Sparkle crosses */}
          <SparkleIcon style={{ position: 'absolute', top: -5, right: 5 }} color="#6C63FF" />
          <SparkleIcon style={{ position: 'absolute', bottom: 10, left: 10 }} color="#A89DFF" size={10} />

          {/* Main purple rounded square icon */}
          <View style={styles.iconWrapper}>
            <CheckIcon />
          </View>
        </View>

        {/* Text content */}
        <View style={styles.textSection}>
          <Text style={styles.title}>Get things done.</Text>
          <Text style={styles.subtitle}>
            Just a click away from{'\n'}planning your tasks.
          </Text>
        </View>

        {/* Pagination dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </View>

      {/* Next arrow button */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => {
          // Navigate to your next screen, e.g.:
          // eslint-disable-next-line no-undef
          router.push('/auth/sign-in');
        }}
        activeOpacity={0.85}
      >
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

// Simple SVG-style checkmark using View
function CheckIcon() {
  return (
    <View style={checkStyles.container}>
      {/* Checkmark drawn with two rotated views */}
      <View style={checkStyles.checkShort} />
      <View style={checkStyles.checkLong} />
    </View>
  );
}

const checkStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkShort: {
    position: 'absolute',
    width: 10,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }, { translateX: -6 }, { translateY: 3 }],
  },
  checkLong: {
    position: 'absolute',
    width: 20,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
    transform: [{ rotate: '-50deg' }, { translateX: 4 }, { translateY: -1 }],
  },
});

// Small sparkle/plus icon
function SparkleIcon({
  style,
  color = '#6C63FF',
  size = 14,
}) {
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <View style={{ width: size, height: 2, backgroundColor: color, borderRadius: 1, position: 'absolute' }} />
      <View style={{ width: 2, height: size, backgroundColor: color, borderRadius: 1, position: 'absolute' }} />
    </View>
  );
}

const PURPLE = '#6C63FF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEECff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Top-left purple blob
  blobTopLeft: {
    position: 'absolute',
    top: -height * 0.05,
    left: -width * 0.15,
    width: width * 0.6,
    height: height * 0.35,
    borderRadius: width * 0.3,
    backgroundColor: PURPLE,
    opacity: 0.85,
    transform: [{ rotate: '-20deg' }],
  },

  // Bottom-right purple blob
  blobBottomRight: {
    position: 'absolute',
    bottom: -height * 0.08,
    right: -width * 0.05,
    width: width * 0.55,
    height: height * 0.3,
    borderRadius: width * 0.28,
    backgroundColor: PURPLE,
    opacity: 0.85,
    transform: [{ rotate: '-15deg' }],
  },

  // White card
  card: {
    width: width * 0.82,
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#4B45B2',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 12,
    minHeight: height * 0.55,
    justifyContent: 'center',
  },

  iconSection: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 10,
    letterSpacing: -0.3,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.1,
  },

  pagination: {
    flexDirection: 'row',
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  dotInactive: {
    backgroundColor: '#E0E0E0',
  },

  dotActive: {
    backgroundColor: PURPLE,
    width: 20,
    borderRadius: 4,
  },

  arrowButton: {
    position: 'absolute',
    bottom: height * 0.07,
    right: width * 0.1,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4B45B2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  arrowText: {
    fontSize: 22,
    color: '#1A1A2E',
    fontWeight: '600',
  },
});