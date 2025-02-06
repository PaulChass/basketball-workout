import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Drill } from './Drill';
import { useTranslation } from 'react-i18next';

const {t} = useTranslation();


type RootStackParamList = {
  DrillsList: undefined;
  DrillDetailsScreen: { drill: Drill };
  WorkoutScreen: { drills: Drill[] };
  DribblingFundamentalsDrills: undefined;
  ThreePointChallenge: undefined;
  FreeShootingSession: undefined;
  ShootingFundamentalsDrills: undefined;
  LayupsFundamentalsDrills: undefined;
  AllDrillsList: undefined;
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