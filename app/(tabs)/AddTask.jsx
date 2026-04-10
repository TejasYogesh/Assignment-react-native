import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#6C63FF';
const PURPLE_LIGHT = '#EEECff';
 
 

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [section, setSection] = useState('Today');

 
  const handleAdd = () => {
    if (!title.trim()) return;
    // TODO: save to Firebase / state
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Purple header ── */}
      <View style={styles.header}>
        <View style={styles.headerTop}>




        </View>

        <Text style={styles.dateLabel}>
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </Text>
        <Text style={styles.headerTitle}>Add New Task</Text>
      </View>

      {/* ── Form card ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Task Title</Text>
          <View style={styles.inputRow}>
            <View style={styles.radioCircle} />
            <TextInput
              style={styles.titleInput}
              placeholder="e.g. Schedule dentist appointment"
              placeholderTextColor="#C0C0C0"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.descInput}
            placeholder="Add details about this task…"
            placeholderTextColor="#C0C0C0"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Section picker */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Section</Text>
          <View style={styles.sectionRow}>
            {['Today', 'Tomorrow', 'This week'].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.sectionChip,
                  section === s && styles.sectionChipActive,
                ]}
                onPress={() => setSection(s)}
              >
                <Text
                  style={[
                    styles.sectionChipText,
                    section === s && styles.sectionChipTextActive,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tags */}
      

        {/* Due date */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Due Date</Text>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={16} color={PURPLE} />
            <TextInput
              style={styles.dateInput}
              placeholder="e.g. 1 May"
              placeholderTextColor="#C0C0C0"
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.addButton} onPress={handleAdd} activeOpacity={0.85}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE,
  },

  // ── Header ──
  header: {
    backgroundColor: PURPLE,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  appIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  searchPlaceholder: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  menuDots: {
    flexDirection: 'row',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  dateLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    marginBottom: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // ── Scroll ──
  scroll: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },

  // ── Fields ──
  field: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9E9E9E',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  // Title row with radio circle
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: PURPLE,
  },
  titleInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },

  // Description
  descInput: {
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#1A1A2E',
    minHeight: 90,
    textAlignVertical: 'top',
  },

  // Section chips
  sectionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: PURPLE_LIGHT,
  },
  sectionChipActive: {
    backgroundColor: PURPLE,
  },
  sectionChipText: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  sectionChipTextActive: {
    color: 'white',
    fontWeight: '600',
  },

  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Date
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PURPLE_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },

  // Add button
  addButton: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});