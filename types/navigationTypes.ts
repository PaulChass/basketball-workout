import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Drill } from './Drill';

type RootStackParamList = {
  DrillsList: undefined;
  DrillDetailsScreen: { drill: Drill };
  WorkoutScreen: { drills: Drill[] };
  DribblingFundamentalsDrills: undefined;
  DribblingChallenge: undefined;
  ThreePointChallenge: undefined;

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