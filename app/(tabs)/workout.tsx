import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Play, X, CircleCheck as CheckCircle2, ChevronRight } from 'lucide-react-native';

export default function WorkoutScreen() {
  const insets = useSafeAreaInsets();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedSets, setCompletedSets] = useState({});

  const handleStartExercise = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCompleteSet = (workoutName) => {
    setCompletedSets(prev => ({
      ...prev,
      [workoutName]: (prev[workoutName] || 0) + 1
    }));
  };

  const closeModal = () => {
    setSelectedWorkout(null);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Workout Plan</Text>
        <Text style={styles.subtitle}>Monday - Upper Body</Text>
      </View>

      <View style={styles.workoutList}>
        {workouts.map((workout, index) => (
          <View key={index} style={styles.workoutCard}>
            <Image
              source={{ uri: workout.image }}
              style={styles.workoutImage}
            />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutDetails}>
                {completedSets[workout.name] || 0}/{workout.sets} sets • {workout.reps} reps
              </Text>
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => handleStartExercise(workout)}
              >
                <Play size={20} color="#3B82F6" />
                <Text style={styles.startButtonText}>Start Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal
        visible={selectedWorkout !== null}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedWorkout?.name}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <X size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Image
                source={{ uri: selectedWorkout?.image }}
                style={styles.modalImage}
              />

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                {selectedWorkout?.steps.map((step, index) => (
                  <View key={index} style={styles.stepContainer}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Track Your Sets</Text>
                <Text style={styles.setSummary}>
                  Completed: {completedSets[selectedWorkout?.name] || 0}/{selectedWorkout?.sets} sets
                </Text>
                
                {completedSets[selectedWorkout?.name] < selectedWorkout?.sets && (
                  <TouchableOpacity 
                    style={styles.completeSetButton}
                    onPress={() => handleCompleteSet(selectedWorkout?.name)}
                  >
                    <CheckCircle2 size={20} color="white" />
                    <Text style={styles.completeSetButtonText}>Complete Set</Text>
                    <ChevronRight size={20} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const workouts = [
  {
    name: 'Push-ups',
    sets: 3,
    reps: 12,
    image: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=600',
    steps: [
      'Start in a plank position with your hands slightly wider than shoulder-width',
      'Lower your body until your chest nearly touches the ground',
      'Keep your core tight and body in a straight line',
      'Push back up to the starting position',
      'Repeat for the prescribed number of repetitions'
    ]
  },
  {
    name: 'Dumbbell Rows',
    sets: 3,
    reps: 15,
    image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600',
    steps: [
      'Place your right knee and hand on a bench',
      'Hold a dumbbell in your left hand with arm extended',
      'Pull the dumbbell up to your chest, keeping your elbow close to your body',
      'Lower the dumbbell back down with control',
      'Complete all reps, then switch sides'
    ]
  },
  {
    name: 'Shoulder Press',
    sets: 3,
    reps: 12,
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=600',
    steps: [
      'Stand with feet shoulder-width apart',
      'Hold dumbbells at shoulder height',
      'Press the weights overhead until arms are fully extended',
      'Lower the weights back to shoulder height with control',
      'Maintain a stable core throughout the movement'
    ]
  },
  {
    name: 'Tricep Extensions',
    sets: 3,
    reps: 15,
    image: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=600',
    steps: [
      'Hold a dumbbell with both hands overhead',
      'Bend your elbows to lower the weight behind your head',
      'Keep your upper arms still and close to your ears',
      'Extend your arms to raise the weight back up',
      'Focus on feeling the contraction in your triceps'
    ]
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748B',
  },
  workoutList: {
    padding: 16,
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  workoutImage: {
    width: '100%',
    height: 200,
  },
  workoutInfo: {
    padding: 16,
  },
  workoutName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#0F172A',
    marginBottom: 4,
  },
  workoutDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginBottom: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#3B82F6',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    marginTop: 64,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#0F172A',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#0F172A',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#3B82F6',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#475569',
    lineHeight: 24,
  },
  setSummary: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginBottom: 16,
  },
  completeSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
  },
  completeSetButtonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: 'white',
  },
});