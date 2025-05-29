import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, Clock } from 'lucide-react-native';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MEALS = {
  Monday: {
    breakfast: {
      name: 'Protein Oatmeal Bowl',
      calories: 350,
      time: '20 min',
      image: 'https://images.pexels.com/photos/4916723/pexels-photo-4916723.jpeg?auto=compress&cs=tinysrgb&w=600',
      ingredients: ['Oats', 'Protein powder', 'Banana', 'Almond milk', 'Berries'],
      macros: { protein: '24g', carbs: '45g', fat: '12g' }
    },
    lunch: {
      name: 'Grilled Chicken Salad',
      calories: 450,
      time: '25 min',
      image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
      ingredients: ['Chicken breast', 'Mixed greens', 'Avocado', 'Cherry tomatoes', 'Olive oil'],
      macros: { protein: '35g', carbs: '20g', fat: '28g' }
    },
    dinner: {
      name: 'Salmon with Quinoa',
      calories: 550,
      time: '30 min',
      image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=600',
      ingredients: ['Salmon fillet', 'Quinoa', 'Broccoli', 'Lemon', 'Herbs'],
      macros: { protein: '42g', carbs: '45g', fat: '25g' }
    }
  }
};

export default function MealPlanScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay()]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const renderMealModal = () => {
    if (!selectedMeal) return null;
    const meal = MEALS[selectedDay]?.[selectedMeal];
    if (!meal) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Image source={{ uri: meal.image }} style={styles.modalImage} />
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalTitle}>{meal.name}</Text>
            <View style={styles.modalStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{meal.calories}</Text>
                <Text style={styles.statLabel}>calories</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{meal.macros.protein}</Text>
                <Text style={styles.statLabel}>protein</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{meal.macros.carbs}</Text>
                <Text style={styles.statLabel}>carbs</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{meal.macros.fat}</Text>
                <Text style={styles.statLabel}>fat</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {meal.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredient}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedMeal(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Plan</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
          contentContainerStyle={styles.daysScrollContent}
        >
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day && styles.selectedDayButton
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText
              ]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.mealsList}>
        {MEALS[selectedDay] && Object.entries(MEALS[selectedDay]).map(([mealTime, meal]) => (
          <TouchableOpacity
            key={mealTime}
            style={styles.mealCard}
            onPress={() => setSelectedMeal(mealTime)}
          >
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealTime}>{mealTime}</Text>
                <View style={styles.timeContainer}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.prepTime}>{meal.time}</Text>
                </View>
              </View>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.calories}>{meal.calories} calories</Text>
              <View style={styles.macros}>
                <Text style={styles.macro}>🥩 {meal.macros.protein}</Text>
                <Text style={styles.macro}>🍚 {meal.macros.carbs}</Text>
                <Text style={styles.macro}>🥑 {meal.macros.fat}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {renderMealModal()}
    </View>
  );
}

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
    marginBottom: 20,
  },
  daysScroll: {
    marginTop: 8,
  },
  daysScrollContent: {
    paddingRight: 16,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  selectedDayButton: {
    backgroundColor: '#3B82F6',
  },
  dayButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#64748B',
  },
  selectedDayButtonText: {
    color: 'white',
  },
  mealsList: {
    padding: 16,
  },
  mealCard: {
    flexDirection: 'row',
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
    alignItems: 'center',
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    margin: 12,
  },
  mealInfo: {
    flex: 1,
    padding: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#3B82F6',
    textTransform: 'capitalize',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prepTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginLeft: 4,
  },
  mealName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#0F172A',
    marginBottom: 4,
  },
  calories: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginBottom: 4,
  },
  macros: {
    flexDirection: 'row',
    gap: 12,
  },
  macro: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalScroll: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  modalStats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#0F172A',
    marginBottom: 16,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredient: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ingredientText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#3B82F6',
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    margin: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: 'white',
  },
});