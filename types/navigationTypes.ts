import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Drill } from './Drill';

export type RootStackParamList = {
  DrillsList: undefined;
  DrillDetailsScreen: { drill: Drill };
  WorkoutScreen: { drills: Drill[] };
  DribblingFundamentalsDrills: undefined;
  CreateDrill: undefined;
  CustomWorkouts: undefined;
  FreeShootingSession: undefined;
  ShootingFundamentalsDrills: undefined;
  LayupsFundamentalsDrills: undefined;
  AllDrillsList: { category: string };
  DrillsTabs: undefined;
  DrillsCategories: undefined;
  // Add other screens here
};

type DrillDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DrillDetailsScreen'
>;

type DrillDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'DrillDetailsScreen'
>;

export type DrillDetailsScreenProps = {
  navigation: DrillDetailsScreenNavigationProp;
  route: DrillDetailsScreenRouteProp;
};

type DrillsListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DrillsList'
>;

type DrillsListRouteProp = RouteProp<
  RootStackParamList,
  'DrillsList'
>;

export type DrillsListProps = {
  navigation: DrillsListNavigationProp;
  route: DrillsListRouteProp;
};

type WorkoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WorkoutScreen'
>;

type WorkoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutScreen'
>;

export type WorkoutScreenProps = {
  navigation: WorkoutScreenNavigationProp;
  route: WorkoutScreenRouteProp;
};

// Add other screen props here as needed