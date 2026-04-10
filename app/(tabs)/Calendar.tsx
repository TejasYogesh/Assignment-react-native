import { StyleSheet, Text, View } from 'react-native';

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📅 Calendar Screen</Text>
      <Text>Upcoming tasks will be shown here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});