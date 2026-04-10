import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const PURPLE = '#6C63FF';

const SLIDES = [
  {
    title: 'Welcome.',
    subtitle: 'Your personal task manager\nis here to help you shine.',
    iconColor: '#FF6B6B',
    dotColors: ['#FF6B6B', '#FFC107', '#E0DDFF', '#6C63FF', '#A89DFF', '#FF6B6B', '#FFC107'],
  },
  {
    title: 'Store any task.',
    subtitle: 'Keep all your tasks in one place,\nneatly organised and ready.',
    iconColor: '#FFC107',
    dotColors: ['#FFC107', '#6C63FF', '#FF6B6B', '#A89DFF', '#FFC107', '#E0DDFF', '#6C63FF'],
  },
  {
    title: 'Get things done.',
    subtitle: 'Just a click away from\nplanning your tasks.',
    iconColor: '#6C63FF',
    dotColors: ['#FF6B6B', '#FFC107', '#E0DDFF', '#6C63FF', '#A89DFF', '#FF6B6B', '#FFC107'],
  },
];

// ── Floating dot ──────────────────────────────────────────
function FloatingDot({ size, color, style, delay = 0 }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 2000 + delay, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 2000 + delay, useNativeDriver: true }),
      ])
    ).start();
  }, [anim, delay]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });

  return (
    <Animated.View
      style={[
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color, position: 'absolute', transform: [{ translateY }] },
        style,
      ]}
    />
  );
}

// ── Sparkle ───────────────────────────────────────────────
function SparkleIcon({ style, color = '#6C63FF', size = 14 }) {
  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <View style={{ width: size, height: 2, backgroundColor: color, borderRadius: 1, position: 'absolute' }} />
      <View style={{ width: 2, height: size, backgroundColor: color, borderRadius: 1, position: 'absolute' }} />
    </View>
  );
}

// ── CheckIcon ─────────────────────────────────────────────
function CheckIcon() {
  return (
    <View style={checkStyles.container}>
      <View style={checkStyles.checkShort} />
      <View style={checkStyles.checkLong} />
    </View>
  );
}

// ── SlideIcon: different icon per slide ───────────────────
function SlideIcon({ index }) {
  if (index === 0) {
    // Hand-wave / star icon for Welcome
    return (
      <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
        {/* Star shape using dots */}
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white', position: 'absolute', top: 0, alignSelf: 'center' }} />
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white', position: 'absolute', bottom: 0, alignSelf: 'center' }} />
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white', position: 'absolute', left: 0, alignSelf: 'center' }} />
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white', position: 'absolute', right: 0, alignSelf: 'center' }} />
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)' }} />
      </View>
    );
  }
  if (index === 1) {
    // Inbox / list icon for Store any task
    return (
      <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
        <View style={{ width: 28, height: 3, backgroundColor: 'white', borderRadius: 2 }} />
        <View style={{ width: 22, height: 3, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 2 }} />
        <View style={{ width: 26, height: 3, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
      </View>
    );
  }
  // Checkmark for Get things done
  return <CheckIcon />;
}

// ── Main component ────────────────────────────────────────
export default function Login() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goTo = (next) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -30, duration: 180, useNativeDriver: true }),
    ]).start(() => {
      setCurrent(next);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      goTo(current + 1);
    } else {
      router.push('/auth/sign-in');
    }
  };

  const slide = SLIDES[current];

  return (
    <View style={styles.container}>
      {/* Blobs */}
      <View style={styles.blobTopLeft} />
      <View style={styles.blobBottomRight} />

      {/* Card */}
      <View style={styles.card}>
        {/* Icon section */}
        <View style={styles.iconSection}>
          <FloatingDot size={10} color={slide.dotColors[0]} style={{ top: 10, left: 20 }} delay={200} />
          <FloatingDot size={7}  color={slide.dotColors[1]} style={{ top: 30, left: 5 }}  delay={400} />
          <FloatingDot size={12} color={slide.dotColors[2]} style={{ top: 5, right: 25 }} delay={100} />
          <FloatingDot size={8}  color={slide.dotColors[3]} style={{ top: 50, right: 10 }} delay={600} />
          <FloatingDot size={6}  color={slide.dotColors[4]} style={{ bottom: 10, left: 30 }} delay={300} />
          <FloatingDot size={9}  color={slide.dotColors[5]} style={{ bottom: 5, right: 35 }} delay={500} />
          <FloatingDot size={5}  color={slide.dotColors[6]} style={{ bottom: 20, right: 15 }} delay={150} />

          <SparkleIcon style={{ position: 'absolute', top: -5, right: 5 }} color={PURPLE} />
          <SparkleIcon style={{ position: 'absolute', bottom: 10, left: 10 }} color="#A89DFF" size={10} />

          <Animated.View
            style={[
              styles.iconWrapper,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <SlideIcon index={current} />
          </Animated.View>
        </View>

        {/* Text */}
        <Animated.View
          style={[styles.textSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>

        {/* Pagination dots */}
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goTo(i)}>
              <View
                style={[
                  styles.dot,
                  i === current ? styles.dotActive : styles.dotInactive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Arrow / Get Started button */}
      <TouchableOpacity style={styles.arrowButton} onPress={handleNext} activeOpacity={0.85}>
        <Text style={styles.arrowText}>
          {current === SLIDES.length - 1 ? '✓' : '→'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────
const checkStyles = StyleSheet.create({
  container: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  checkShort: {
    position: 'absolute', width: 10, height: 3, backgroundColor: 'white', borderRadius: 2,
    transform: [{ rotate: '45deg' }, { translateX: -6 }, { translateY: 3 }],
  },
  checkLong: {
    position: 'absolute', width: 20, height: 3, backgroundColor: 'white', borderRadius: 2,
    transform: [{ rotate: '-50deg' }, { translateX: 4 }, { translateY: -1 }],
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEECff',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    height: 8,
    borderRadius: 4,
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    width: 20,
    backgroundColor: PURPLE,
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