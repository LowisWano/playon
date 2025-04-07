import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function AutoApprove() {
  
  const [isAutoApprove, setIsAutoApprove] = useState(false);

  const handleAutoApprove = async () => {
    // Make API call to update auto approve setting
    setIsAutoApprove(!isAutoApprove)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Auto Approve</Text>
      <TouchableOpacity
        style={[
          styles.toggle, 
          { backgroundColor: isAutoApprove ? '#4CAF50' : '#666' }
        ]}
        onPress={() => handleAutoApprove()}
      >
        <View style={[
          styles.toggleKnob, 
          { marginLeft: isAutoApprove ? 26 : 2 }
        ]} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3A3A3A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  toggle: {
    width: 50,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center'
  },
  toggleKnob: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10
  }
});