import { auth } from '@/configs/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PURPLE = '#6C63FF';
const PURPLE_LIGHT = '#EEECff';
const PURPLE_MID = '#A89DFF';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await auth.signOut();
              router.replace('/');
            } catch (error) {
              Alert.alert('Error', 'Failed to log out. Please try again.', error);
            }
          },
        },
      ]
    );
  };



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.displayName || "User"}
          </Text>

          <Text style={styles.profileEmail}>
            {user?.email || "No email"}
          </Text>
        </View>

        <View style={styles.profileBadge}>
          <Text style={styles.profileBadgeText}>PRO</Text>
        </View>
      </View>
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
        <Ionicons name="log-out-outline" size={20} color="#FF4D4D" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      {/* Preferences Section */}
      <SectionLabel title="Preferences" />

      <View style={styles.section}>
        <SettingRow
          icon="notifications-outline"
          label="Notifications"
          right={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E0E0E0', true: PURPLE_MID }}
              thumbColor={notificationsEnabled ? PURPLE : '#f4f3f4'}
            />
          }
        />
        <Divider />
        <SettingRow
          icon="moon-outline"
          label="Dark Mode"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E0E0E0', true: PURPLE_MID }}
              thumbColor={darkMode ? PURPLE : '#f4f3f4'}
            />
          }
        />
      </View>

      {/* Account Section */}
      <SectionLabel title="Account" />

      <View style={styles.section}>
        <SettingRow
          icon="person-outline"
          label="Edit Profile"
          right={<Ionicons name="chevron-forward" size={18} color="#C0C0C0" />}
          onPress={() => { }}
        />
        <Divider />
        <SettingRow
          icon="lock-closed-outline"
          label="Change Password"
          right={<Ionicons name="chevron-forward" size={18} color="#C0C0C0" />}
          onPress={() => { }}
        />
        <Divider />
        <SettingRow
          icon="shield-checkmark-outline"
          label="Privacy Policy"
          right={<Ionicons name="chevron-forward" size={18} color="#C0C0C0" />}
          onPress={() => { }}
        />
      </View>

      {/* Support Section */}
      <SectionLabel title="Support" />

      <View style={styles.section}>
        <SettingRow
          icon="help-circle-outline"
          label="Help & FAQ"
          right={<Ionicons name="chevron-forward" size={18} color="#C0C0C0" />}
          onPress={() => { }}
        />
        <Divider />
        <SettingRow
          icon="star-outline"
          label="Rate the App"
          right={<Ionicons name="chevron-forward" size={18} color="#C0C0C0" />}
          onPress={() => { }}
        />
      </View>



      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

// ── Small reusable components ──────────────────────────────

function SectionLabel({ title }) {
  return <Text style={styles.sectionLabel}>{title}</Text>;
}

function Divider() {
  return <View style={styles.divider} />;
}

function SettingRow({ icon, label, right, onPress }) {
  const Inner = (
    <View style={styles.settingRow}>
      <View style={styles.settingIconWrap}>
        <Ionicons name={icon} size={20} color={PURPLE} />
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingRight}>{right}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {Inner}
      </TouchableOpacity>
    );
  }
  return Inner;
}

// ── Styles ─────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4FF',
  },
  content: {
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A2E',
    letterSpacing: -0.5,
  },

  // Profile card
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: PURPLE,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
  },
  profileBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  profileBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  // Section label
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9E9E9E',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginHorizontal: 24,
    marginBottom: 8,
    marginTop: 4,
  },

  // Settings card
  section: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#4B45B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '500',
  },
  settingRight: {
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EFFF',
    marginLeft: 66,
  },

  // Logout
  logoutButton: {
    marginHorizontal: 20,
    marginVertical:10,
    marginTop: 8,
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFD6D6',
  },
  logoutText: {
    color: '#FF4D4D',
    fontSize: 16,
    fontWeight: '700',
  },

  versionText: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontSize: 12,
    marginTop: 24,
  },
});